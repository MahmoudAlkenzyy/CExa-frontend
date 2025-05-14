"use client";
import * as React from 'react'
import useSpeachStore from "@/lib/store";
import { useState, useRef, useEffect } from "react";
import { FaMicrophoneAltSlash, FaPhoneAlt } from "react-icons/fa";
import { FaPhoneSlash } from "react-icons/fa6";
// import { throttle } from 'lodash';
// import { encodeWAV } from "../../utils/encodeWav";
// const AudioRecorderPage = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const audioContextRef = useRef<AudioContext | null>(null);
//   const scriptNodeRef = useRef<ScriptProcessorNode | null>(null);
//   const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
//   const audioBufferRef = useRef<Float32Array[]>([]);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   const numChannels = 12;

//   // Function to send WAV Blob to API endpoint
//   const sendWavChunk = async (wavBlob: Blob) => {
//     const formData = new FormData();
//     formData.append("audio", wavBlob, chunk_${Date.now()}.wav);
//     try {
//       console.log({ wavBlob });

//       //   const response = await fetch("https://your-api-endpoint.com", {
//       //     method: "POST",
//       //     body: formData,
//       //   });
//       //   if (!response.ok) {
//       //     throw new Error(HTTP error! status: ${response.status});
//       //   }
//       console.log("WAV chunk sent successfully");
//     } catch (error) {
//       console.error("Error sending WAV chunk:", error);
//     }
//   };

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const audioContext = new AudioContext({ sampleRate: 16000 });
//       audioContextRef.current = audioContext;
//       const source = audioContext.createMediaStreamSource(stream);
//       sourceRef.current = source;

//       const bufferSize = 4096;
//       const scriptNode = audioContext.createScriptProcessor(
//         bufferSize,
//         numChannels,
//         numChannels
//       );
//       scriptNodeRef.current = scriptNode;

//       // Collect audio samples on each process call
//       scriptNode.onaudioprocess = (event) => {
//         const inputBuffer = event.inputBuffer;
//         const channelData = inputBuffer.getChannelData(0);
//         // Copy samples so they aren't modified later
//         audioBufferRef.current.push(new Float32Array(channelData));
//       };

//       source.connect(scriptNode);
//       // Connect to destination (or use an offline node) so processing occurs
//       scriptNode.connect(audioContext.destination);

//       // Every 1000ms, process collected samples, convert to WAV, send, and clear the buffer
//       intervalRef.current = setInterval(() => {
//         if (audioBufferRef.current.length === 0) return;

//         // Flatten collected buffers
//         const totalLength = audioBufferRef.current.reduce(
//           (sum, arr) => sum + arr.length,
//           0
//         );
//         const merged = new Float32Array(totalLength);
//         let offset = 0;
//         for (const arr of audioBufferRef.current) {
//           merged.set(arr, offset);
//           offset += arr.length;
//         }

//         // Convert to WAV using the current sample rate
//         const wavBlob = encodeWAV(merged, audioContext.sampleRate, numChannels);
//         sendWavChunk(wavBlob);

//         // Clear the buffer for the next interval
//         audioBufferRef.current = [];
//       }, 3000);

//       setIsRecording(true);
//     } catch (error) {
//       console.error("Error starting recording:", error);
//     }
//   };

//   const stopRecording = async () => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }
//     if (scriptNodeRef.current) {
//       scriptNodeRef.current.disconnect();
//       scriptNodeRef.current = null;
//     }
//     if (sourceRef.current) {
//       sourceRef.current.disconnect();
//       sourceRef.current = null;
//     }
//     if (audioContextRef.current) {
//       await audioContextRef.current.close();
//       audioContextRef.current = null;
//     }
//     setIsRecording(false);
//   };

//   useEffect(() => {
//     return () => {
//       stopRecording();
//     };
//   }, []);

//   return (
//     <div className="">
//       {/* AI Response Display */}

//       {/* Control Buttons */}
//       <div className="flex justify-center gap-5 bg-white rounded-b-xl py-5">
//         <button
//           onClick={startRecording}
//           disabled={isRecording}
//           className={`bg-green-500 hover:scale-105 transition-all duration-[400] hover:bg-opacity-90 rounded-full w-10 h-10 text-white flex justify-center items-center ${
//             isRecording && "cursor-not-allowed"
//           }`}
//         >
//           <FaPhoneAlt />
//         </button>
//         <button className="bg-[#D9D9D97D] hover:scale-105 transition-all duration-[400] hover:bg-opacity-90  rounded-full w-10 h-10 text-[#00000099] flex justify-center items-center">
//           <FaMicrophoneAltSlash />
//         </button>
//         <button
//           onClick={stopRecording}
//           disabled={!isRecording}
//           className={`bg-red-500 hover:scale-105 transition-all duration-[400] hover:bg-opacity-90 rounded-full w-10 h-10 text-white flex justify-center items-center ${
//             !isRecording && "cursor-not-allowed"
//           }`}
//         >
//           <FaPhoneSlash />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AudioRecorderPage;

const AudioRecorderPage = () => {
  //   const [isRecording, setIsRecording] = useState(false);
  //   const audioContextRef = useRef<AudioContext | null>(null);
  //   const processorRef = useRef<ScriptProcessorNode | null>(null);
  //   const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  //   const socketRef = useRef<Socket | null>(null);

  //   useEffect(() => {
  //     // Initialize Socket.IO client with proper typing
  //     socketRef.current = io("http://localhost:11000", {
  //       transports: ["websocket"],
  //       upgrade: false,
  //       forceBase64: false,
  //       transportOptions: {
  //         websocket: {
  //           binaryType: "arraybuffer",
  //         },
  //       },
  //     });

  //     return () => {
  //       socketRef.current?.disconnect();
  //     };
  //   }, []);

  //   const startRecording = async () => {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({
  //         audio: {
  //           sampleRate: 16000,
  //           channelCount: 1,
  //           latency: 0.01,
  //         },
  //       });

  //       const audioContext = new AudioContext({
  //         sampleRate: 16000,
  //         latencyHint: "playback",
  //       });
  //       audioContextRef.current = audioContext;
  //       const source = audioContext.createMediaStreamSource(stream);
  //       sourceRef.current = source;

  //       const bufferSize = 160;
  //       const processor = audioContext.createScriptProcessor(bufferSize, 1, 1);
  //       processorRef.current = processor;

  //       const converter = new Int16Array(bufferSize);

  //       processor.onaudioprocess = (event: AudioProcessingEvent) => {
  //         if (!socketRef.current?.connected) return;

  //         const channelData = event.inputBuffer.getChannelData(0);

  //         for (let i = 0; i < bufferSize; i++) {
  //           converter[i] = Math.max(
  //             -32768,
  //             Math.min(32767, channelData[i] * 32767)
  //           );
  //         }

  //         socketRef.current.emit("audioChunk", converter.buffer);
  //       };

  //       source.connect(processor);
  //       processor.connect(audioContext.destination);
  //       setIsRecording(true);
  //     } catch (error) {
  //       console.error("Error starting recording:", error);
  //     }
  //   };

  //   const stopRecording = async () => {
  //     if (processorRef.current) {
  //       processorRef.current.disconnect();
  //       processorRef.current.onaudioprocess = null;
  //       processorRef.current = null;
  //     }

  //     if (sourceRef.current) {
  //       sourceRef.current.disconnect();
  //       sourceRef.current = null;
  //     }

  //     if (audioContextRef.current) {
  //       await audioContextRef.current.close();
  //       audioContextRef.current = null;
  //     }

  //     setIsRecording(false);
  //   };
  const [isRecording, setIsRecording] = useState(false);
  const { addClient } = useSpeachStore();
  const messageBuffer = useRef("");
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioSocket = useRef<WebSocket | null>(null);
  const textSocket = useRef<WebSocket | null>(null);
  const agentSocket = useRef<WebSocket | null>(null);
  const processorRef = useRef<AudioWorkletNode | null>(null);
  //   console.log(transcription);
const id = "Mahmoud"
  // WebSocket URLs
  const AUDIO_WS_URL = "wss://4.227.187.182:5000";
  const TEXT_WS_URL = "wss://4.227.187.182:5001";
  const AGENT_URL = "wss://4.227.187.182:5003";

  // Audio configuration (matches Python settings)
  const CHUNK_SIZE = 256;
  const SAMPLE_RATE = 16000;
  const CHANNELS = 1;

  useEffect(() => {
    // Create socket instances
    const audio = new WebSocket(AUDIO_WS_URL);
    const text = new WebSocket(TEXT_WS_URL);
    const agent = new WebSocket(AGENT_URL);
  
    audioSocket.current = audio;
    textSocket.current = text;
    agentSocket.current = agent;
  
    // TEXT SOCKET
    text.onmessage = (event) => {
      const textData = event.data;
    //   console.log("Text message:", textData);
  console.log({"text": event.data});
  
      
        addClient({ isclient: true, message: textData });
      
    };
  
    // AGENT SOCKET
    agent.onmessage = (event) => {
      const data = event.data;
  
      if (data === "Start Here!!") {
        messageBuffer.current = "";
        return;
      }
  
      if (data === "End Here!!") {
        if (messageBuffer.current !== "") {
          addClient({ isclient: false, message: messageBuffer.current });
        }
        messageBuffer.current = "";
        return;
      }
//   console.log({data,message:messageBuffer.current});
      messageBuffer.current += data;
    };
  
    // Send initial IDs once sockets are open
    const sendInitData = (socket: WebSocket) => {
      socket.onopen = () => {
        socket.send(JSON.stringify({ id }));
      };
    };
  
    sendInitData(text);
    sendInitData(agent);
    sendInitData(audio);
  
    return () => {
      // Clean up sockets on unmount
      audio.close();
      text.close();
      agent.close();
      stopRecording();
    };
  }, []);
  
 const initializeAudio = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        sampleRate: SAMPLE_RATE,
        channelCount: CHANNELS,
        echoCancellation: false,
        noiseSuppression: false,
      },
    });

    mediaStreamRef.current = stream;
    
    // Type-safe AudioContext initialization without global declarations
    const AudioContextConstructor = (
      window.AudioContext || 
      (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    );
    
    if (!AudioContextConstructor) {
      throw new Error('Web Audio API is not supported in this browser');
    }
    
    audioContextRef.current = new AudioContextConstructor({
      sampleRate: SAMPLE_RATE,
    });

    // Rest of your initialization code...
    await audioContextRef.current.audioWorklet.addModule("/audio-processor.js");
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
