"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaMicrophoneAltSlash, FaPhoneAlt } from "react-icons/fa";
import { FaPhoneSlash } from "react-icons/fa6";

export const VoiceButton = () => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  console.log(mediaRecorderRef);

  useEffect(() => {
    const initMediaRecorder = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
    };

    initMediaRecorder();
  }, []);

  const startRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="">
      <div className="flex justify-center gap-5 bg-white rounded-b-xl py-5">
        <button
          className={`bg-green-500  hover:scale-105 transition-all duration-[400] hover:bg-opacity-90 rounded-full w-10 h-10 text-white flex justify-center items-center ${
            isRecording && "cursor-not-allowed"
          }`}
          onClick={startRecording}
          disabled={isRecording}
        >
          <FaPhoneAlt />
        </button>
        <button className="bg-[#D9D9D97D] hover:scale-105 transition-all duration-[400] hover:bg-opacity-90  rounded-full w-10 h-10 text-[#00000099] flex justify-center items-center">
          <FaMicrophoneAltSlash />
        </button>
        <button
          className={`bg-red-500  hover:scale-105 transition-all duration-[400] hover:bg-opacity-90 rounded-full w-10 h-10 text-white flex justify-center items-center ${
            !isRecording && "cursor-not-allowed"
          }`}
          onClick={stopRecording}
          disabled={!isRecording}
        >
          <FaPhoneSlash />
        </button>
      </div>
    </div>
  );
};
