import { create } from "zustand";
import { SpeachData } from "../types";

// Define the state and actions types
interface SpeachState {
  SpeachData: SpeachData; // البيانات الأصلية
  //   positivePercent: number;
  //   neutralPercent: number;
  //   negativePercent: number;

  moodLabel: string;
  background: string;
  markerPosition: number;
  maxValue: number;
  filledBars: number;
  client: { isclient: boolean; message: string }[];
  sum: {
    point1: string;
    point2: string;
    point3: string;
    point4: string;
    point5: string;
  };
  mediaStream: MediaStream | null;
  isRecording: boolean;
  callDuration: number;
  language: "ar" | "en";
  sessionId: string;
  isMuted: boolean;
  isNoiseCancellationEnabled: boolean;
  updateData: (data: SpeachData) => void;
  updateSum: (sum: {
    point1: string;
    point2: string;
    point3: string;
    point4: string;
    point5: string;
  }) => void;
  addClient: (newClient: { isclient: boolean; message: string }) => void;
  setMediaStream: (stream: MediaStream | null) => void;
  setIsRecording: (recording: boolean) => void;
  setCallDuration: (duration: number) => void;
  toggleLanguage: () => void;
  setSessionId: (id: string) => void;
  setIsMuted: (muted: boolean) => void;
  setIsNoiseCancellationEnabled: (enabled: boolean) => void;
  resetStore: () => void;
}

// Create the store
const useSpeachStore = create<SpeachState>((set) => ({
  SpeachData: {
    confidenceScores: 0,

    sentiment: "neutral",
    moodRecomendtion: "",
  },
  positivePercent: 0,
  neutralPercent: 0,
  negativePercent: 0,
  moodLabel: "عادي",
  background: "#FACC15",
  markerPosition: 49,
  maxValue: 0,
  filledBars: 0,
  client: [],
  moodeRecomendtion: "",
  sum: {
    point1: "",
    point2: "",
    point3: "",
    point4: "",
    point5: "",
  },
  mediaStream: null,
  isRecording: false,
  callDuration: 0,
  language: "ar",
  sessionId: Math.random().toString(36).substring(7),
  isMuted: false,
  isNoiseCancellationEnabled: true,

  updateData: (data) => {
    const confidenceScores = data.confidenceScores;
    const sentiment = data.sentiment;
    const moodRecomendtion = data.moodRecomendtion;
    // const maxValue = Math.max(positivePercent, neutralPercent, negativePercent);
    // const filledBars = Math.ceil((maxValue / 100) * 10);

    let moodLabel = "عادي";
    let background = "#FACC15";
    // let markerPosition = 49;

    if (sentiment === "Positive") {
      moodLabel = "سعيد";
      background = "#4ADE80";
      //   markerPosition = 43 - (positivePercent / 100) * 45;
    } else if (sentiment === "Neutral") {
      moodLabel = "عادي";
      background = "#FACC15";
      //   markerPosition = 49;
    } else if (sentiment === "Negative") {
      moodLabel = "حزين";
      background = "#EA384C";
      //   markerPosition = (negativePercent / 100) * 45 + 50;
    }

    set({
      SpeachData: { confidenceScores, sentiment, moodRecomendtion },

      moodLabel,
      background,
    });
  },

  addClient: (newClient) => {
    // console.log({newClient});

    set((state) => ({
      client: [...state.client, newClient],
    }));
  },

  updateSum: (sum) => {
    set({ sum });
  },

  setMediaStream: (mediaStream) => {
    set({ mediaStream });
  },

  setIsRecording: (isRecording) => {
    set({ isRecording });
  },

  setCallDuration: (callDuration) => {
    set({ callDuration });
  },

  toggleLanguage: () => {
    set((state) => ({ language: state.language === "ar" ? "en" : "ar" }));
  },

  setSessionId: (sessionId) => {
    set({ sessionId });
  },

  setIsMuted: (isMuted) => {
    set({ isMuted });
  },
  setIsNoiseCancellationEnabled: (isNoiseCancellationEnabled) => {
    set({ isNoiseCancellationEnabled });
  },

  resetStore: () => {
    set({
      SpeachData: {
        confidenceScores: 0,
        sentiment: "Neutral",
        moodRecomendtion: "",
      },
      client: [],
      callDuration: 0,
      moodLabel: "عادي",
      background: "#FACC15",
    });
  },
}));

export default useSpeachStore;
