"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { State } from "../page";
import { useQuizStore } from "@/store/quiz-store";

interface ResultPageProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<State>>;
}

export default function ResultPage({ setCurrentPage }: ResultPageProps) {
  const { correctAnswers, startTime, endTime, resetQuiz } = useQuizStore();
  const totalQuestions = 50;

  const calculateDuration = () => {
    if (!startTime || !endTime) return "N/A";
    const duration = Math.floor((endTime - startTime) / 1000);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}m ${seconds}s`;
  };

  const handleRetakeQuiz = () => {
    resetQuiz();
    setCurrentPage("quiz");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6">
      <Card className="max-w-4xl w-full p-8 bg-slate-800 text-white">
        <h1 className="text-4xl font-bold mb-6 text-center">Quiz Results</h1>

        <div className="text-center mb-8">
          <p className="text-6xl font-bold mb-2">
            {((correctAnswers / totalQuestions) * 100).toFixed(1)}%
          </p>
          <p className="text-xl">
            Final Score: {correctAnswers} out of {totalQuestions} questions
          </p>
          <p className="mt-4 text-lg">Time taken: {calculateDuration()}</p>
        </div>

        <div className="mt-8 space-x-4 flex justify-center">
          <Button
            onClick={handleRetakeQuiz}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Retake Quiz
          </Button>
          <Button
            onClick={() => setCurrentPage("landing")}
            className="bg-slate-600 hover:bg-slate-700 text-white"
          >
            Back to Main Menu
          </Button>
        </div>
      </Card>
    </div>
  );
}
