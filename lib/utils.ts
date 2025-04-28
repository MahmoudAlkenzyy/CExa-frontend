import { clsx, type ClassValue } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const initializeAudioContext = async (
  audioContextRef: React.MutableRefObject<AudioContext | null>,
  analyserRef: React.MutableRefObject<AnalyserNode | null>,
  dataArrayRef: React.MutableRefObject<Uint8Array | null>
) => {
  if (!audioContextRef.current) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContextRef.current = new AudioContext();
  }

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const source = audioContextRef.current.createMediaStreamSource(stream);
  analyserRef.current = audioContextRef.current.createAnalyser();
  analyserRef.current.fftSize = 2048;
  dataArrayRef.current = new Uint8Array(analyserRef.current.fftSize);
  source.connect(analyserRef.current);
};
