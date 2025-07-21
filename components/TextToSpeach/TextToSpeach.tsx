import React, { useEffect, useRef } from "react";
import { sendInitData } from "../../app/test/page";
import { RandomId } from "../../constant";

export default function TextToSpeach() {
  const SPEECH_URL = "https://cexa.eastus.cloudapp.azure.com:5008";
  const socketRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const isFirstRef = useRef(true);

  useEffect(() => {
    // Initialize AudioContext
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioContextClass) {
      throw new Error("Web Audio API is not supported in this browser");
    }

    audioContextRef.current = new AudioContextClass({ sampleRate: 16000 });

    // 1) Open secure WS and ask for blobs
    const ws = new WebSocket(SPEECH_URL);
    ws.binaryType = "arraybuffer";
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("🎧 Speech WS open");
      sendInitData(ws, RandomId);
    };

    ws.onmessage = async (e) => {
      try {
        // 2) e.data is an ArrayBuffer of raw PCM16 @16kHz mono
        const pcmBuffer = e.data as ArrayBuffer;
        console.log({ pcmBuffer });

        if (!pcmBuffer.byteLength) {
          console.warn("Received empty audio buffer");
          return;
        }

        // 3) Wrap it in a WAV header
        const wavBuffer = makeWav(pcmBuffer, {
          sampleRate: 24000,
          channels: 1,
        });

        // 4) Create blob and decode
        const blob = new Blob([wavBuffer], { type: "audio/wav" });
        const arrayBuffer = await blob.arrayBuffer();

        if (!audioContextRef.current) return;

        const audioBuffer = await audioContextRef.current.decodeAudioData(
          arrayBuffer
        );

        // 5) Create and schedule playback
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContextRef.current.destination);

        // Calculate start time for gapless playback
        const now = audioContextRef.current.currentTime;
        const startTime = isFirstRef.current
          ? now
          : Math.max(now, nextStartTimeRef.current);

        source.start(startTime);
        nextStartTimeRef.current = startTime + audioBuffer.duration;
        isFirstRef.current = false;

        console.log("▶️ Playing audio chunk");
      } catch (err) {
        console.error("Playback failed:", err);
      }
    };

    ws.onerror = (err) => console.error("WS error:", err);
    ws.onclose = () => console.log("Speech WS closed");

    (async () => {
      sendInitData(ws, RandomId);
    })();

    return () => {
      ws.close();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return <div className="hidden">Streaming text‑to‑speech…</div>;
}

function makeWav(
  buffer: ArrayBuffer,
  options: { sampleRate: number; channels: number }
) {
  const { sampleRate, channels } = options;
  const bytesPerSample = 2;
  const blockAlign = channels * bytesPerSample;
  const wav = new ArrayBuffer(44 + buffer.byteLength);
  const view = new DataView(wav);

  // RIFF header
  let p = 0;
  function writeString(s: string) {
    for (let i = 0; i < s.length; i++) view.setUint8(p++, s.charCodeAt(i));
  }
  writeString("RIFF");
  view.setUint32(p, 36 + buffer.byteLength, true);
  p += 4;
  writeString("WAVE");
  writeString("fmt ");
  view.setUint32(p, 16, true);
  p += 4; // fmt chunk length
  view.setUint16(p, 1, true);
  p += 2; // PCM
  view.setUint16(p, channels, true);
  p += 2;
  view.setUint32(p, sampleRate, true);
  p += 4;
  view.setUint32(p, sampleRate * blockAlign, true);
  p += 4;
  view.setUint16(p, blockAlign, true);
  p += 2;
  view.setUint16(p, bytesPerSample * 8, true);
  p += 2;
  writeString("data");
  view.setUint32(p, buffer.byteLength, true);
  p += 4;

  // Copy the PCM samples
  const uint8Array = new Uint8Array(wav);
  uint8Array.set(new Uint8Array(buffer), 44);
  return wav;
}
