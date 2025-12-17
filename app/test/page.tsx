"use client";
import * as React from "react";
import useSpeachStore from "@/lib/store";
import { useState, useRef, useEffect } from "react";
import { FaMicrophoneAltSlash, FaPhoneAlt } from "react-icons/fa";
import { FaPhoneSlash } from "react-icons/fa6";

import { RandomId } from "../../constant";

const AudioRecorderPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const { addClient } = useSpeachStore();
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioSocket = useRef<WebSocket | null>(null);
  const textSocket = useRef<WebSocket | null>(null);

  const processorRef = useRef<AudioWorkletNode | null>(null);

  const AUDIO_WS_URL = "https://cexa-v2.westus.cloudapp.azure.com:5000";
  const TEXT_WS_URL = "https://cexa-v2.westus.cloudapp.azure.com:5001";
  //   const AGENT_URL = "https://cexa-v2.westus.cloudapp.azure.com:5003";

  const CHUNK_SIZE = 256;
  const SAMPLE_RATE = 16000;
  const CHANNELS = 1;

  useEffect(() => {
    const audio = new WebSocket(AUDIO_WS_URL);
    const text = new WebSocket(TEXT_WS_URL);
    // const agent = new WebSocket(AGENT_URL);

    audioSocket.current = audio;
    textSocket.current = text;
    // agentSocket.current = agent;

    text.onmessage = (event) => {
      const textData = event.data;

      addClient({ isclient: true, message: textData });
    };

    // agent.onmessage = (event) => {
    //   const data = event.data;

    //   if (data === "Start Here!!") {
    //     messageBuffer.current = "";
    //     return;
    //   }

    //   if (data === "End Here!!") {
    //     if (messageBuffer.current !== "") {
    //       addClient({ isclient: false, message: messageBuffer.current });
    //     }
    //     messageBuffer.current = "";
    //     return;
    //   }

    //   messageBuffer.current += data;
    // };

    (async () => {
      sendInitData(text, RandomId);
      //   sendInitData(agent, RandomId);
      sendInitData(audio, RandomId);
    })();

    return () => {
      audio.close();
      text.close();
      //   agent.close();
      stopRecording();
    };
  }, []);

  const initializeAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: SAMPLE_RATE,
          channelCount: CHANNELS,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      mediaStreamRef.current = stream;

      const AudioContextConstructor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;

      if (!AudioContextConstructor) {
        throw new Error("Web Audio API not supported");
      }

      audioContextRef.current = new AudioContextConstructor({
        sampleRate: SAMPLE_RATE,
      });

      await audioContextRef.current.audioWorklet.addModule(
        "/audio-processor.js"
      );

      const source = audioContextRef.current.createMediaStreamSource(stream);

      processorRef.current = new AudioWorkletNode(
        audioContextRef.current,
        "audio-processor",
        { processorOptions: { chunkSize: CHUNK_SIZE } }
      );

      processorRef.current.port.onmessage = (event) => {
        if (audioSocket.current?.readyState === WebSocket.OPEN) {
          const rawData = new Uint8Array(event.data);
          audioSocket.current.send(rawData);
        }
      };

      source.connect(processorRef.current);

      processorRef.current.connect(audioContextRef.current.destination);

      setIsRecording(true);
    } catch (error) {
      console.error("Error initializing audio:", error);
    }
  };

  const startRecording = async () => {
    if (!isRecording) {
      await initializeAudio();
    }
  };

  const stopRecording = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setIsRecording(false);
  };
  return (
    <div className="">
      {/* AI Response Display */}

      {/* Control Buttons */}
      <div className="flex justify-center gap-5 bg-white rounded-b-xl py-5">
        <button
          onClick={startRecording}
          disabled={isRecording}
          className={`bg-green-500 hover:scale-105 transition-all duration-[400] hover:bg-opacity-90 rounded-full w-10 h-10 text-white flex justify-center items-center ${
            isRecording && "cursor-not-allowed"
          }`}
        >
          <FaPhoneAlt />
        </button>
        <button className="bg-[#D9D9D97D] hover:scale-105 transition-all duration-[400] hover:bg-opacity-90  rounded-full w-10 h-10 text-[#00000099] flex justify-center items-center">
          <FaMicrophoneAltSlash />
        </button>
        <button
          onClick={stopRecording}
          disabled={!isRecording}
          className={`bg-red-500 hover:scale-105 transition-all duration-[400] hover:bg-opacity-90 rounded-full w-10 h-10 text-white flex justify-center items-center ${
            !isRecording && "cursor-not-allowed"
          }`}
        >
          <FaPhoneSlash />
        </button>
      </div>
    </div>
  );
};

export default AudioRecorderPage;

export const sendInitData = (
  socket: WebSocket,
  data: string
): Promise<void> => {
  return new Promise((resolve) => {
    socket.onopen = () => {
      socket.send(data);
      resolve();
    };
  });
};
