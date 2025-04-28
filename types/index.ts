import { Dispatch, SetStateAction } from "react";

export interface VoiceBottonProps {
  setClient: Dispatch<SetStateAction<string[]>>;
  client: string[];
}
export interface SpeachData {
  id: string;
  // warnings: any[];
  sentiment: string;
  confidenceScores: ConfidenceScores;
  sentences: Sentence[];
}
export interface StateSliderProps {
  moodValue: number;
  setMoodValue: React.Dispatch<React.SetStateAction<number>>;
}
export interface ConfidenceScores {
  positive: number;
  neutral: number;
  negative: number;
}

export interface Sentence {
  confidenceScores: ConfidenceScores2;
  sentiment: string;
  text: string;
  offset: number;
  length: number;
  // opinions: any[];
}

export interface ConfidenceScores2 {
  positive: number;
  neutral: number;
  negative: number;
}
export interface AccordionProps {
  data: RecomendationData[];
}
export interface RecomendationData {
  name: string;
  price: number;
}

export interface MoodSliderProps {
  moodData: {
    positive: number;
    neutral: number;
    negative: number;
  };
  className?: string;
}
