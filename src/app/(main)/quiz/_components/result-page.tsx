"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { State } from "../page";
import { useQuizStore } from "@/store/quiz-store";
import Image from "next/image";
import { Home, CheckCircle } from "lucide-react";
import { useCreateLeaderboardEntry } from "@/lib/api/requests/quiz.requests";
import Link from "next/link";

interface ResultPageProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<State>>;
}

export default function ResultPage({ setCurrentPage }: ResultPageProps) {
  const { correctAnswers, startTime, endTime } = useQuizStore();
  const totalQuestions = 50;
  const score = ((correctAnswers / totalQuestions) * 100).toFixed(1);

  const createLeaderboardEntry = useCreateLeaderboardEntry();
  const [submissionAttempted, setSubmissionAttempted] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (
      !submissionAttempted &&
      correctAnswers !== undefined &&
      startTime &&
      endTime
    ) {
      setSubmissionAttempted(true);
      createLeaderboardEntry.mutate(
        {
          score: Number(score),
          startTime: startTime.toString(),
          endTime: endTime.toString(),
        },
        {
          onSuccess: () => {
            setSubmissionMessage("Score submitted to leaderboard!");
          },
          onError: (error: any) => {
            console.log(error);
            if (
              error.response?.data?.message ===
              "Leaderboard entry already exists for this user."
            ) {
              setSubmissionMessage("Score already submitted to leaderboard.");
            } else {
              setSubmissionMessage("Failed to submit score to leaderboard.");
            }
          },
        }
      );
    }
  }, [
    correctAnswers,
    startTime,
    endTime,
    score,
    createLeaderboardEntry,
    submissionAttempted,
  ]);

  return (
    <>
      <div className="confetti">
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-4xl w-full bg-white bg-opacity-10 rounded-xl overflow-hidden">
          <div className="p-8 mt-20">
            <div className="flex justify-center -mt-24">
              <Image
                src="/assets/Guzuha-02.jpg"
                alt="Level Complete"
                width={200}
                height={200}
              />
            </div>
            <div className="text-center mt-6">
              <h1 className="text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-500">
                {score}%
              </h1>
              <p className="text-2xl font-semibold mb-4">Quiz Completed!</p>
              <p className="text-xl flex items-center justify-center mt-4 gap-2 w-full">
                <CheckCircle className="w-6 h-6 stroke-green-600" />
                <span>
                  <span className="font-bold"> {correctAnswers}</span> out of{" "}
                  {totalQuestions} questions
                </span>
              </p>
              {submissionMessage && (
                <p
                  className={`mt-2 ${
                    submissionMessage.includes("Failed")
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {submissionMessage}
                </p>
              )}
            </div>

            <div className="mt-12 space-x-4 flex justify-center">
              <Link href="/quiz">
                <Button className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center">
                  <Home className="w-5 h-5 mr-2" />
                  Main Menu
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
