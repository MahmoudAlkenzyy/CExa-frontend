"use client";

import React, { useEffect, useRef } from "react";
import { sendInitData } from "../../app/test/page";
import { RandomId } from "../../constant";

export default function TextToSpeach() {
  const SPEECH_URL = "wss://cexa-v2.westus.cloudapp.azure.com:5008";
  const INTERAPTION_URL = "wss://cexa-v2.westus.cloudapp.azure.com:5006";
  const SAMPLE_RATE = 24000; // Must match server sample rate

  const socketRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const scriptNodeRef = useRef<ScriptProcessorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const audioQueueRef = useRef<Float32Array[]>([]);
  const isPlayingRef = useRef(false);
  const isPausedRef = useRef(false);
  const totalBytesRef = useRef(0);

  const allowPlaybackRef = useRef(true);

  useEffect(() => {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioContextClass) return;

    // Initialize AudioContext with correct sample rate
    try {
      audioContextRef.current = new AudioContextClass({
        sampleRate: SAMPLE_RATE,
      });
      console.log(
        `AudioContext created with sample rate: ${audioContextRef.current.sampleRate}Hz`
      );

      // Create gain node for volume control
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
      gainNodeRef.current.gain.value = 0.8; // Default 80% volume
    } catch (e) {
      console.log(`Could not set sample rate: ${e}. Using default.`);
      audioContextRef.current = new AudioContextClass();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
      gainNodeRef.current.gain.value = 0.8;

      const actualSampleRate = audioContextRef.current.sampleRate;
      if (actualSampleRate !== SAMPLE_RATE) {
        console.warn(
          `WARNING: Sample rate mismatch! Server: ${SAMPLE_RATE}Hz, Browser: ${actualSampleRate}Hz`
        );
        console.warn(`Audio will be resampled. This may affect quality.`);
      }
    }

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
      if (scriptNodeRef.current) {
        try {
          scriptNodeRef.current.disconnect();
          console.log("⏹️ Audio stopped (interrupt)");
        } catch (err) {
          console.warn("⚠️ error stopping audio:", err);
        }
        scriptNodeRef.current = null;
      }
      // reset queue
      audioQueueRef.current = [];
      isPlayingRef.current = false;
      isPausedRef.current = false;
      totalBytesRef.current = 0;
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

    const startAudioPlayback = () => {
      if (!audioContextRef.current || !gainNodeRef.current) return;
      if (scriptNodeRef.current) return; // Already playing

      // Resume audio context if suspended
      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }

      // Create script processor for custom audio processing
      scriptNodeRef.current = audioContextRef.current.createScriptProcessor(
        4096,
        1,
        1
      );

      let position = 0;
      let currentBuffer: Float32Array | null = null;
      let underflowCount = 0;

      scriptNodeRef.current.onaudioprocess = (audioProcessingEvent) => {
        if (isPausedRef.current || !allowPlaybackRef.current) {
          // Output silence if paused or blocked
          const outputBuffer = audioProcessingEvent.outputBuffer;
          for (
            let channel = 0;
            channel < outputBuffer.numberOfChannels;
            channel++
          ) {
            outputBuffer.getChannelData(channel).fill(0);
          }
          return;
        }

        const outputBuffer = audioProcessingEvent.outputBuffer;
        const outputData = outputBuffer.getChannelData(0);
        const samplesNeeded = outputData.length;

        let samplesWritten = 0;

        while (samplesWritten < samplesNeeded) {
          // Get next buffer if needed
          if (!currentBuffer || position >= currentBuffer.length) {
            if (audioQueueRef.current.length === 0) {
              // No more data, fill with silence
              underflowCount++;
              if (underflowCount === 1) {
                console.log(
                  "Audio buffer underflow - waiting for more data..."
                );
              }
              for (let i = samplesWritten; i < samplesNeeded; i++) {
                outputData[i] = 0;
              }
              break;
            }
            currentBuffer = audioQueueRef.current.shift()!;
            position = 0;
            underflowCount = 0;
          }

          // Copy samples from current buffer
          const samplesToCopy = Math.min(
            currentBuffer.length - position,
            samplesNeeded - samplesWritten
          );

          for (let i = 0; i < samplesToCopy; i++) {
            outputData[samplesWritten + i] = currentBuffer[position + i];
          }

          samplesWritten += samplesToCopy;
          position += samplesToCopy;
        }
      };

      // Connect to gain node (which connects to destination)
      scriptNodeRef.current.connect(gainNodeRef.current);
      isPlayingRef.current = true;
      console.log("▶️ Audio playback started");
    };

    ws.onmessage = (e) => {
      if (e.data instanceof ArrayBuffer) {
        const bytes = e.data.byteLength;
        totalBytesRef.current += bytes;
        console.log(
          `Received audio chunk: ${bytes} bytes (total: ${totalBytesRef.current} bytes)`
        );

        // Convert Int16 PCM to Float32 for Web Audio API
        const int16Array = new Int16Array(e.data);
        const float32Array = new Float32Array(int16Array.length);

        // Convert Int16 to Float32 (-1 to 1)
        for (let i = 0; i < int16Array.length; i++) {
          float32Array[i] = int16Array[i] / 32768.0;
        }

        audioQueueRef.current.push(float32Array);

        // Start playback if not already playing
        if (!isPlayingRef.current && allowPlaybackRef.current) {
          startAudioPlayback();
        }
      } else {
        console.log(`Received non-binary data: ${e.data}`);
      }
    };

    ws.onerror = (err) => console.error("WS error:", err);
    ws.onclose = () => {
      console.log("Speech WS closed");
      console.log(
        `Total audio received: ${totalBytesRef.current} bytes (${(
          totalBytesRef.current /
          2 /
          SAMPLE_RATE
        ).toFixed(2)}s at ${SAMPLE_RATE}Hz)`
      );
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
    };
  }, []);

  return <div className="hidden">Streaming text-to-speech…</div>;
}
