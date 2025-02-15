"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useQuizStore } from "@/store/quiz-store";
import { se } from "date-fns/locale";

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
}: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const { level, questionCount, setQuestionCount } = useQuizStore();

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setQuestionCount(0);
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
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 lg:w-80 lg:h-80">
              <Image
                src="/assets/g1.png"
                alt="Quiz"
                layout="fill"
                objectFit="contain"
                className="drop-shadow-2xl"
              />
            </div>
          </div>

          <div className="w-full lg:w-2/3 max-w-2xl space-y-8">
            <div className="space-y-4">
              <p className="text-purple-400 font-semibold">
                Level {level} - Question {currentQuestionIndex + 1} of{" "}
                {questions.question.length}
              </p>
              <h2 className="text-3xl font-semibold">
                {questions.question[currentQuestionIndex].question}
              </h2>
            </div>

            <div className="w-full h-2 bg-slate-700 rounded-full">
              <div
                className="h-full bg-purple-600 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="space-y-4">
              {questions.question[currentQuestionIndex].answers.map(
                (answer, index) => (
                  <Card
                    key={index}
                    className={`p-4 flex items-center gap-4 cursor-pointer transition-all duration-200 w-full
                    ${
                      selectedAnswer === index
                        ? "bg-purple-600 border-purple-500 text-white"
                        : "bg-slate-800 hover:bg-slate-700 text-white border-slate-700"
                    }`}
                    onClick={() => setSelectedAnswer(index)}
                  >
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-slate-700 text-white font-semibold">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-sm md:text-lg">{answer}</span>
                  </Card>
                )
              )}
            </div>

            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-xl rounded-2xl transition-all duration-200"
              onClick={handleSubmit}
              disabled={
                selectedAnswer === null || (level === 5 && questionCount === 10)
              }
            >
              Submit Answer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
