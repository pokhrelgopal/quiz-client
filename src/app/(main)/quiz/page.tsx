"use client";
import React, { useState, useEffect } from "react";
import QuizLanding from "./_components/landing";
import QuizPage from "./_components/quiz-page";
import ResultPage from "./_components/result-page";
import { useQuizStore } from "@/store/quiz-store";

export type State = "landing" | "quiz" | "result" | "leaderboard";

export default function Quiz() {
  const [currentPage, setCurrentPage] = useState<State>("landing");
  const { questionCount, setIsCompleted } = useQuizStore();

  useEffect(() => {
    if (questionCount === 50) {
      setIsCompleted();
      setCurrentPage("result");
    }
  }, [questionCount, setIsCompleted]);

  return (
    <>
      {currentPage === "landing" && (
        <QuizLanding setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "quiz" && <QuizPage setCurrentPage={setCurrentPage} />}
      {currentPage === "result" && (
        <ResultPage setCurrentPage={setCurrentPage} />
      )}
    </>
  );
}
