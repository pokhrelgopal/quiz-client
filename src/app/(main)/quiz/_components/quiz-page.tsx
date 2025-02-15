"use client";
import { useGetQuestions } from "@/lib/api/requests/quiz.requests";
import React, { useState } from "react";
import QuizQuestion from "./quiz-component";
import { State } from "../page";
import PageLoader from "@/components/elements/page-loader";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<State>>;
}

export default function QuizPage({ setCurrentPage }: Props) {
  const [level, setLevel] = useState(1);
  const { data, error, isLoading } = useGetQuestions(level);

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <div>Error: An error occurred while fetching questions.</div>;
  }

  if (!data?.data?.questions) {
    return <div>No questions available.</div>;
  }

  return (
    <>
      <QuizQuestion questions={data.data.questions} />
    </>
  );
}
