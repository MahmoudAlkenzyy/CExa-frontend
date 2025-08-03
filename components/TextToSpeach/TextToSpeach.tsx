import React, { useEffect, useRef } from "react";
import { sendInitData } from "../../app/test/page";
import { RandomId } from "../../constant";

export default function TextToSpeach() {
  const SPEECH_URL = "https://cexa.eastus.cloudapp.azure.com:5008";
  const socketRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const isFirstRef = useRef(true);
  const outputAudioRef = useRef<HTMLAudioElement>(null);
  const chunkQueueRef = useRef<ArrayBuffer[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioContextClass) return;
    audioContextRef.current = new AudioContextClass({ sampleRate: 24000 });

    const audioElement = document.createElement("audio");
    audioElement.style.display = "none";
    document.body.appendChild(audioElement);
    outputAudioRef.current = audioElement;

    const ws = new WebSocket(SPEECH_URL);
    ws.binaryType = "arraybuffer";
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("🎧 Speech WS open");
      sendInitData(ws, RandomId);
    };

    const combineBuffers = (
      buffer1: ArrayBuffer,
      buffer2: ArrayBuffer
    ): ArrayBuffer => {
      const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
      tmp.set(new Uint8Array(buffer1), 0);
      tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
      return tmp.buffer;
    };

    const playAudioBuffer = async (buffer: ArrayBuffer) => {
      try {
        if (!buffer.byteLength) {
          console.warn("Received empty audio buffer");
          return;
        }

        if (!audioContextRef.current) return;

        const audioBuffer = await audioContextRef.current.decodeAudioData(
          buffer
        );

        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContextRef.current.destination);

        const now = audioContextRef.current.currentTime;
        const startTime = isFirstRef.current
          ? now
          : Math.max(now, nextStartTimeRef.current);

        source.start(startTime);
        nextStartTimeRef.current = startTime + audioBuffer.duration;
        isFirstRef.current = false;

        console.log("▶️ Playing OGG audio chunk");
      } catch (err) {
        console.error("Playback failed:", err);
      }
    };

    const processQueue = () => {
      if (chunkQueueRef.current.length >= 2) {
        const chunk1 = chunkQueueRef.current.shift()!;
        const chunk2 = chunkQueueRef.current.shift()!;
        const combined = combineBuffers(chunk1, chunk2);
        playAudioBuffer(combined);

        if (chunkQueueRef.current.length >= 2) {
          processQueue();
        }
      } else if (chunkQueueRef.current.length === 1) {
        timeoutRef.current = setTimeout(() => {
          if (chunkQueueRef.current.length > 0) {
            const chunk = chunkQueueRef.current.shift()!;
            playAudioBuffer(chunk);
          }
        }, 500);
      }
    };

    ws.onmessage = (e) => {
      const pcmBuffer = e.data as ArrayBuffer;
      chunkQueueRef.current.push(pcmBuffer);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      processQueue();
    };

    ws.onerror = (err) => console.error("WS error:", err);
    ws.onclose = () => {
      console.log("Speech WS closed");

      while (chunkQueueRef.current.length > 0) {
        const chunk = chunkQueueRef.current.shift()!;
        playAudioBuffer(chunk);
      }
    };

    (async () => {
      sendInitData(ws, RandomId);
    })();

    return () => {
      ws.close();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
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
  p += 4;
  view.setUint16(p, 1, true);
  p += 2;
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

  const uint8Array = new Uint8Array(wav);
  uint8Array.set(new Uint8Array(buffer), 44);
  return wav;
}
