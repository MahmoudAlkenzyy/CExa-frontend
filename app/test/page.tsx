"use client";
import * as React from "react";
import useSpeachStore from "@/lib/store";
import { useState, useRef, useEffect } from "react";
import { RandomId } from "../../constant";
import { FaMicrophoneSlash, FaPhone, FaPhoneSlash } from "react-icons/fa6";
import { MdGraphicEq } from "react-icons/md";
import { SummaryPopup } from "../../components/SummaryPopup/SummaryPopup";

const AudioRecorderPage = () => {
  const [isRecordingLocal, setIsRecordingLocal] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const {
    addClient,
    setIsRecording,
    setMediaStream,
    setCallDuration,
    callDuration,
    language,
    sessionId,
    setSessionId,
    isMuted,
    setIsMuted,
    isNoiseCancellationEnabled,
    setIsNoiseCancellationEnabled,
    resetStore,
  } = useSpeachStore();

  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioSocket = useRef<WebSocket | null>(null);
  const textSocket = useRef<WebSocket | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const processorRef = useRef<AudioWorkletNode | null>(null);

  const AUDIO_WS_URL = "https://cexa-v2.westus.cloudapp.azure.com:5000";
  const TEXT_WS_URL = "https://cexa-v2.westus.cloudapp.azure.com:5001";

  const CHUNK_SIZE = 256;
  const SAMPLE_RATE = 16000;
  const CHANNELS = 1;

  const connectSockets = (id: string) => {
    // Close existing sockets if any
    if (audioSocket.current) audioSocket.current.close();
    if (textSocket.current) textSocket.current.close();

    const audio = new WebSocket(AUDIO_WS_URL);
    const text = new WebSocket(TEXT_WS_URL);

    audioSocket.current = audio;
    textSocket.current = text;

    text.onmessage = (event) => {
      const textData = event.data;
      console.log({ textData });
      addClient({ isclient: true, message: textData });
    };

    audio.onopen = () => audio.send(id);
    text.onopen = () => text.send(id);
  };

  useEffect(() => {
    return () => {
      //   stopRecording();
      if (audioSocket.current) audioSocket.current.close();
      if (textSocket.current) textSocket.current.close();
    };
  }, []);

  useEffect(() => {
    if (isRecordingLocal) {
      timerRef.current = setInterval(() => {
        setCallDuration(callDuration + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecordingLocal, callDuration, setCallDuration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

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
      setMediaStream(stream);

      // Handle Initial Mute State
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !isMuted;
      });

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
        "/audio-processor.js",
      );

      const source = audioContextRef.current.createMediaStreamSource(stream);

      processorRef.current = new AudioWorkletNode(
        audioContextRef.current,
        "audio-processor",
        { processorOptions: { chunkSize: CHUNK_SIZE } },
      );

      processorRef.current.port.onmessage = (event) => {
        if (audioSocket.current?.readyState === WebSocket.OPEN && !isMuted) {
          const rawData = new Uint8Array(event.data);
          audioSocket.current.send(rawData);
        }
      };

      if (isNoiseCancellationEnabled) {
        // High Pass Filter: Remove low-frequency atmospheric noise/rumble
        const hpf = audioContextRef.current.createBiquadFilter();
        hpf.type = "highpass";
        hpf.frequency.value = 100;

        // Low Pass Filter: Remove high-frequency hiss
        const lpf = audioContextRef.current.createBiquadFilter();
        lpf.type = "lowpass";
        lpf.frequency.value = 7500;

        // Dynamics Compressor: Acts as a subtle noise gate and stabilizes levels
        const compressor = audioContextRef.current.createDynamicsCompressor();
        compressor.threshold.setValueAtTime(
          -50,
          audioContextRef.current.currentTime,
        );
        compressor.knee.setValueAtTime(40, audioContextRef.current.currentTime);
        compressor.ratio.setValueAtTime(
          12,
          audioContextRef.current.currentTime,
        );
        compressor.attack.setValueAtTime(
          0,
          audioContextRef.current.currentTime,
        );
        compressor.release.setValueAtTime(
          0.25,
          audioContextRef.current.currentTime,
        );

        source.connect(hpf);
        hpf.connect(lpf);
        lpf.connect(compressor);
        compressor.connect(processorRef.current);
      } else {
        source.connect(processorRef.current);
      }
      processorRef.current.connect(audioContextRef.current.destination);

      setIsRecordingLocal(true);
      setIsRecording(true);
      setCallDuration(0);
    } catch (error) {
      console.error("Error initializing audio:", error);
    }
  };

  const startRecording = async () => {
    if (!isRecordingLocal) {
      resetStore();
      const newId = Math.random().toString(36).substring(7);
      setSessionId(newId);
      connectSockets(newId);
      await initializeAudio();
      setShowSummary(false);
    }
  };

  const stopRecording = async () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }

    // Close sockets
    if (audioSocket.current) audioSocket.current.close();
    if (textSocket.current) textSocket.current.close();

    setIsRecordingLocal(false);
    setIsRecording(false);
    setMediaStream(null);

    setShowSummary(true);

    // Call API for summary
    // if (isRecordingLocal) {
    //   fetchSummary();
    // }
  };

  //   const fetchSummary = async () => {
  //     try {
  //       // Assuming there's a summary API
  //       const response = await fetch(
  //         `https://cexa-v2.westus.cloudapp.azure.com:5003/summary/${sessionId}`,
  //       );
  //       const data = await response.json();
  //       setSummaryData(data);
  //       setShowSummary(true);
  //     } catch (error) {
  //       console.error("Error fetching summary:", error);
  //       // Fallback for demo
  //       setSummaryData({
  //         message:
  //           language === "ar"
  //             ? "تم إنهاء المكالمة بنجاح"
  //             : "Call ended successfully",
  //       });
  //       setShowSummary(true);
  //     }
  //   };

  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !newMuteState;
      });
    }
  };

  return (
    <div className="relative">
      {/* Control Buttons */}
      <div className="flex justify-center gap-2 md:gap-5 text-white rounded-b-xl py-5 px-2 md:px-0">
        <button
          onClick={startRecording}
          disabled={isRecordingLocal}
          className={`border-[#8CCD47] border hover:scale-105  transition-all duration-[400] hover:bg-opacity-90 rounded-full p-3 text-white flex justify-center items-center ${
            isRecordingLocal && "cursor-not-allowed"
          }`}
          style={{ transform: "rotateY(180deg)" }}
        >
          <FaPhone color="#8CCD47" size={20} className="" />
        </button>
        <p
          className={`text-white flex ${language === "ar" ? "flex-row-reverse" : "flex-row"} gap-2 items-center`}
        >
          {" "}
          {/* <span className="md:text-base text-sm text-[#A6A1A1]">
            {language === "ar" ? "جاري التسجيل" : "Recording"}
          </span> */}
          <span className="md:text-base text-sm">
            {formatTime(callDuration)}
          </span>
          <span className="md:text-base text-sm">
            {language === "ar" ? "محمود الكنزي" : "Mahmoud Al-Kenzi"}
          </span>
        </p>
        <button
          onClick={toggleMute}
          className={`border border-[#A6A1A1] hover:scale-105 transition-all duration-[400] hover:bg-opacity-90 rounded-full p-3 text-[#00000099] flex justify-center items-center ${isMuted ? "bg-red-500/20 shadow-[0_0_10px_red]" : ""}`}
        >
          <FaMicrophoneSlash
            color={isMuted ? "#E52121" : "#A6A1A1"}
            size={20}
          />
        </button>
        <button
          onClick={() =>
            setIsNoiseCancellationEnabled(!isNoiseCancellationEnabled)
          }
          className={`border border-[#A6A1A1] hover:scale-105 transition-all duration-[400] hover:bg-opacity-90 rounded-full p-3 flex justify-center items-center ${isNoiseCancellationEnabled ? "bg-green-500/20 shadow-[0_0_10px_#8CCD47]" : ""}`}
          title={language === "ar" ? "إلغاء الضوضاء" : "Noise Cancellation"}
        >
          <MdGraphicEq
            color={isNoiseCancellationEnabled ? "#8CCD47" : "#A6A1A1"}
            size={20}
          />
        </button>
        <button
          onClick={stopRecording}
          disabled={!isRecordingLocal}
          className={`border border-[#E52121] hover:scale-105 transition-all duration-[400] hover:bg-opacity-90 rounded-full p-3 text-white flex justify-center items-center ${
            !isRecordingLocal && "cursor-not-allowed"
          }`}
        >
          <FaPhoneSlash color="#E52121" size={20} />
        </button>
      </div>

      <SummaryPopup
        showSummary={showSummary}
        setShowSummary={setShowSummary}
        language={language}
        sessionId={sessionId}
      />
    </div>
  );
};

export default AudioRecorderPage;

export const sendInitData = (
  socket: WebSocket,
  data: string,
): Promise<void> => {
  return new Promise((resolve) => {
    socket.onopen = () => {
      socket.send(data);
      resolve();
    };
  });
};
