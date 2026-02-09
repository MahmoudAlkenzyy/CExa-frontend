"use client";

import { useRef, useEffect } from "react";
import { BsMic } from "react-icons/bs";
import useSpeachStore from "@/lib/store";
import { IoPauseCircleOutline } from "react-icons/io5";

const VoiceWaves: React.FC = () => {
  const { mediaStream, isRecording, callDuration, language } = useSpeachStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    let staticAnimationId: number;

    const runStaticAnimation = () => {
      if (!isRecording && canvasRef.current) {
        drawStaticWave(canvasRef.current);
        staticAnimationId = 73682;
      }
    };

    if (mediaStream && isRecording) {
      const AudioContextConstructor =
        window.AudioContext || (window as any).webkitAudioContext;

      if (!AudioContextConstructor) {
        console.error("Web Audio API not supported");
        return;
      }

      audioContextRef.current = new AudioContextConstructor();
      const analyser = audioContextRef.current.createAnalyser();
      analyser.fftSize = 2048;

      const source =
        audioContextRef.current.createMediaStreamSource(mediaStream);
      source.connect(analyser);

      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

      // Start drawing recording waves
      draw();
    } else {
      // Stop recording animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      // Start static animation
      runStaticAnimation();
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (staticAnimationId) cancelAnimationFrame(staticAnimationId);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, [mediaStream, isRecording]);

  const draw = (): void => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    if (!canvas || !analyser || !dataArray) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get frequency data
    analyser.getByteTimeDomainData(dataArray as Uint8Array<ArrayBuffer>);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Style similar to your SVG
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#1C6CB7";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#1C6CB7";
    ctx.beginPath();

    const sliceWidth = (canvas.width * 0.8) / dataArray.length;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      // Normalize values
      const v = dataArray[i] / 128.0;
      let y = (v * canvas.height) / 2;

      // Add jaggedness like the SVG path
      y += Math.sin(i * 0.15) * 10; // small oscillation
      y += (Math.random() - 0.5) * 6; // random jitter

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    animationRef.current = requestAnimationFrame(draw);
  };

  function drawStaticWave(canvas: HTMLCanvasElement, color = "#1C6CB7") {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.shadowBlur = 10;
    ctx.shadowColor = color;

    ctx.beginPath();

    const centerY = height / 2;
    const step = 2; // distance between points
    let x = 0;

    while (x < width) {
      // Create irregular peaks (mix sine + randomness)
      const y =
        centerY +
        Math.sin(x * 0.05) * (height / 6) +
        (Math.random() - 0.5) * (height / 8);

      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);

      x += step;
    }

    ctx.stroke();
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <p className="text-xl text-white text-center pt-1">
        {language === "ar" ? "التفاعل اللحظي" : "Real-time Interaction"}
      </p>
      <canvas
        ref={canvasRef}
        width={600}
        height={200}
        className=" bg-transparent w-[60%] mx-auto"
        style={{ maxWidth: "600px" }}
      />
      <div className="flex w-full gap-2">
        <div className="bg-[#0D204B] text-xs grow p-3 rounded-2xl  text-white">
          {formatTime(callDuration)}
        </div>
        <div className="bg-[#0D204B] gp-3 rounded-2xl px-3 py-0 flex items-center">
          <BsMic className="text-white " />
          <IoPauseCircleOutline className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default VoiceWaves;
