"use client";

import React, { useEffect, useRef } from "react";
import { sendInitData } from "../../app/test/page";
import { RandomId } from "../../constant";

export default function TextToSpeach() {
  const SPEECH_URL = "wss://cexa-v2.eastus.cloudapp.azure.com:5008";
  const INTERAPTION_URL = "wss://cexa-v2.eastus.cloudapp.azure.com:5006";

  const socketRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const isFirstRef = useRef(true);
  const chunkQueueRef = useRef<ArrayBuffer[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // interrupt flag
  const allowPlaybackRef = useRef(true);

  useEffect(() => {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioContextClass) return;
    audioContextRef.current = new AudioContextClass({ sampleRate: 24000 });

    const ws = new WebSocket(SPEECH_URL);
    ws.binaryType = "arraybuffer";
    socketRef.current = ws;

    const interaption = new WebSocket(INTERAPTION_URL);

    ws.onopen = () => {
      console.log("🎧 Speech WS open");
    };

    interaption.onopen = () => {
      console.log("🎧 Interaption WS open");
    };

    const stopCurrentAudio = () => {
      if (currentSourceRef.current) {
        try {
          currentSourceRef.current.stop();
          console.log("⏹️ Audio stopped (interrupt)");
        } catch (err) {
          console.warn("⚠️ error stopping audio:", err);
        }
        currentSourceRef.current = null;
      }
      // reset queue
      chunkQueueRef.current = [];
      isFirstRef.current = true;
      nextStartTimeRef.current = 0;
    };

    interaption.onmessage = (e) => {
      const interapt = e.data;
      if (interapt === "interrupt") {
        allowPlaybackRef.current = false;
        stopCurrentAudio();
      }
      if (interapt === "end_of_speech") {
        allowPlaybackRef.current = true;
      }
      console.log("📩 interrupt flag:", allowPlaybackRef.current);
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
      if (!allowPlaybackRef.current) {
        console.log("🚫 Playback blocked due to interrupt");
        return;
      }
      try {
        if (!buffer.byteLength) return;
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
        currentSourceRef.current = source;

        nextStartTimeRef.current = startTime + audioBuffer.duration;
        isFirstRef.current = false;

        source.onended = () => {
          if (currentSourceRef.current === source) {
            currentSourceRef.current = null;
          }
        };

        console.log("▶️ Playing OGG audio chunk");
      } catch (err) {
        console.error("Playback failed:", err);
      }
    };

    const processQueue = () => {
      if (!allowPlaybackRef.current) return;

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
      stopCurrentAudio();
    };

    (async () => {
      sendInitData(ws, RandomId);
      sendInitData(interaption, RandomId);
    })();

    return () => {
      ws.close();
      interaption.close();
      stopCurrentAudio();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return <div className="hidden">Streaming text-to-speech…</div>;
}
