"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Question {
  question: string;
  comment: string;
  test_answer: number;
  answers: string[];
}

export interface QuizProps {
  questions: {
    test_group: number;
    question: Question[];
  };
  onQuestionAnswered: (isCorrect: boolean) => void;
  level: number;
}

export default function QuizQuestion({
  questions,
  onQuestionAnswered,
  level,
}: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
  }, []);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect =
      selectedAnswer === questions.question[currentQuestionIndex].test_answer;
    onQuestionAnswered(isCorrect);

    if (currentQuestionIndex < questions.question.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    }
  };

  const progress =
    ((currentQuestionIndex + 1) / questions.question.length) * 100;

  return (
    <div className="min-h-screen flex items-center bg-slate-900 text-white p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-4">
          <p className="text-white">
            Level {level} - Question {currentQuestionIndex + 1} of{" "}
            {questions.question.length}
          </p>
          <h2 className="text-3xl font-semibold">
            {questions.question[currentQuestionIndex].question}
          </h2>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-slate-700 rounded-full">
          <div
            className="h-full bg-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Answer options */}
        <div className="space-y-4">
          {questions.question[currentQuestionIndex].answers.map(
            (answer, index) => (
              <Card
                key={index}
                className={`p-4 flex items-center gap-4 cursor-pointer transition-colors
                ${
                  selectedAnswer === index
                    ? "bg-purple-600/20 border-purple-500 text-white"
                    : "bg-slate-800/50 hover:bg-slate-800/70 text-white border-slate-700"
                }`}
                onClick={() => setSelectedAnswer(index)}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded bg-slate-700 text-white font-semibold">
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-lg">{answer}</span>
              </Card>
            )
          )}
        </div>

        <Button
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-xl rounded-2xl"
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
        >
          Submit Answer
        </Button>
      </div>
    </div>
  );
}
