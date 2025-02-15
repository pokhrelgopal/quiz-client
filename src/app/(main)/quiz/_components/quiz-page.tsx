"use client";

import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "@/lib/api/requests/quiz.requests";
import type React from "react";
import { useEffect, useState } from "react";
import QuizQuestion from "./quiz-component";
import type { State } from "../page";
import PageLoader from "@/components/elements/page-loader";
import { useQuizStore } from "@/store/quiz-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { me } from "@/lib/api/requests";
import Link from "next/link";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<State>>;
}

export default function QuizPage({ setCurrentPage }: Props) {
  const {
    level,
    questionCount,
    startTime,
    incrementQuestionCount,
    incrementCorrectAnswers,
    setStartTime,
    setLevel,
    setIsCompleted,
  } = useQuizStore();

  const [showLevelCompleteDialog, setShowLevelCompleteDialog] = useState(false);
  const [showQuizCompleteDialog, setShowQuizCompleteDialog] = useState(false);
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["me"],
    queryFn: me,
    retry: 1,
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ["questions", level],
    queryFn: () => getQuestions(level),
    enabled: !!level,
  });

  useEffect(() => {
    if (!startTime) {
      setStartTime();
    }
  }, [startTime, setStartTime]);

  useEffect(() => {
    if (questionCount > 0 && questionCount % 10 === 0) {
      if (level < 5) {
        setShowLevelCompleteDialog(true);
      } else if (questionCount === 50) {
        setShowQuizCompleteDialog(true);
        setIsCompleted();
      }
    }
  }, [questionCount, level, setIsCompleted]);

  const handleQuestionAnswered = (isCorrect: boolean) => {
    if (isCorrect) {
      incrementCorrectAnswers();
    }
    incrementQuestionCount();
  };

  const handleContinue = () => {
    setShowLevelCompleteDialog(false);
    if (level < 5) {
      setLevel(level + 1);
    }
  };

  const handleQuizComplete = () => {
    setCurrentPage("result");
  };

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <div>Error: An error occurred while fetching questions.</div>;
  }

  if (!data?.data.questions) {
    return <div>No questions available.</div>;
  }

  return (
    <>
      <QuizQuestion
        questions={data.data.questions}
        onQuestionAnswered={handleQuestionAnswered}
        level={level}
      />

      <Dialog
        open={showLevelCompleteDialog}
        onOpenChange={setShowLevelCompleteDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Level {level} Completed!</DialogTitle>
            <DialogDescription>
              Congratulations! You've completed level {level}.
              {user
                ? " Ready for the next challenge?"
                : " Log in to continue your progress!"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {user ? (
              <Button onClick={handleContinue}>
                Continue to Level {level + 1}
              </Button>
            ) : (
              <Button asChild>
                <Link href="/auth/login">Log In to Continue</Link>
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showQuizCompleteDialog}
        onOpenChange={setShowQuizCompleteDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quiz Completed!</DialogTitle>
            <DialogDescription>
              Congratulations! You've completed all levels of the quiz.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button disabled={userLoading} onClick={handleQuizComplete}>
              View Results
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
