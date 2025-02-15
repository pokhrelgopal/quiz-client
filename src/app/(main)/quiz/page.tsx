"use client";
import Link from "next/link";
import React, { useState } from "react";
import QuizLanding from "./_components/landing";
import QuizPage from "./_components/quiz-page";

export type State = "landing" | "quiz" | "success";

export default function quiz() {
  const [currentPage, setCurrentPage] = useState<State>("landing");

  return (
    <>
      {currentPage === "landing" && (
        <QuizLanding setCurrentPage={setCurrentPage} />
      )}

      {currentPage === "quiz" && (
        <QuizPage setCurrentPage={setCurrentPage} />
      )}
    </>
  );
}
