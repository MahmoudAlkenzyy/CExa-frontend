import { create } from "zustand";
import { SpeachData } from "../types";

// Define the state and actions types
interface SpeachState {
  SpeachData: SpeachData; // البيانات الأصلية
  positivePercent: number;
  neutralPercent: number;
  negativePercent: number;
  moodLabel: string;
  background: string;
  markerPosition: number;
  maxValue: number;
  filledBars: number;
  client: string[];
  sum: {
    point1: string;
    point2: string;
    point3: string;
    point4: string;
    point5: string;
  };
  updateData: (data: SpeachData) => void;
  updateSum: (sum: {
    point1: string;
    point2: string;
    point3: string;
    point4: string;
    point5: string;
  }) => void;
  addClient: (newClient: string) => void;
}

// Create the store
const useSpeachStore = create<SpeachState>((set) => ({
  SpeachData: {
    confidenceScores: { negative: 0, neutral: 0, positive: 0 },
    id: "",
    sentiment: "neutral",
    sentences: [],
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
  sum: {
    point1: "",
    point2: "",
    point3: "",
    point4: "",
    point5: "",
  },

  updateData: (data) => {
    const positivePercent = Math.round(data.confidenceScores.positive * 100);
    const neutralPercent = Math.round(data.confidenceScores.neutral * 100);
    const negativePercent = Math.round(data.confidenceScores.negative * 100);

    const maxValue = Math.max(positivePercent, neutralPercent, negativePercent);
    const filledBars = Math.ceil((maxValue / 100) * 10);

    let moodLabel = "عادي";
    let background = "#FACC15";
    let markerPosition = 49;

    if (maxValue === positivePercent) {
      moodLabel = "سعيد";
      background = "#4ADE80";
      markerPosition = 43 - (positivePercent / 100) * 45;
    } else if (maxValue === neutralPercent) {
      moodLabel = "عادي";
      background = "#FACC15";
      markerPosition = 49;
    } else if (maxValue === negativePercent) {
      moodLabel = "حزين";
      background = "#EA384C";
      markerPosition = (negativePercent / 100) * 45 + 50;
    }

    set({
      SpeachData: data,
      positivePercent,
      neutralPercent,
      negativePercent,
      moodLabel,
      background,
      markerPosition,
      maxValue,
      filledBars,
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
}));

export default useSpeachStore;
