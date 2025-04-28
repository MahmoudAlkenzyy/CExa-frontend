import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { Dispatch, SetStateAction } from "react";

export const handleRecognized =
  (setClient: Dispatch<SetStateAction<string[]>>) =>
  (s: sdk.Recognizer, e: sdk.SpeechRecognitionEventArgs) => {
    if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
      console.log("Recognized:", e);
      setClient((prev) => [...prev, e.result.text]);
    } else {
      console.log("Recognition failed:", e.result.reason);
    }
  };

export const handleCanceled = (
  s: sdk.Recognizer,
  e: sdk.SpeechRecognitionCanceledEventArgs
) => {
  console.error("Recognition canceled:", e.reason);
};

export const handleSessionStopped = (
  s: sdk.Recognizer,
  e: sdk.SessionEventArgs
) => {
  console.log("Session stopped:", e);
};
