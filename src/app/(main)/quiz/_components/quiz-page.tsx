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
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<State>>;
}

export default function QuizPage({ setCurrentPage }: Props) {
  const {
    level,
    questionCount,
    startTime,
    incrementQuestionCount,
    setQuestionCount,
    incrementCorrectAnswers,
    setStartTime,
    setEndTime,
    setLevel,
    setIsCompleted,
    setIsRedirected,
  } = useQuizStore();
  const router = useRouter();
  const [showLevelCompleteDialog, setShowLevelCompleteDialog] = useState(false);
  const [showQuizCompleteDialog, setShowQuizCompleteDialog] = useState(false);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["questions", level],
    queryFn: () => getQuestions(level),
    enabled: !!level,
  });

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["me"],
    queryFn: me,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
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
      } else if (level === 5) {
        setShowQuizCompleteDialog(true);
        setEndTime();
        setIsCompleted();
      }
    }
  }, [questionCount, level, setEndTime, setIsCompleted]);

  const handleQuestionAnswered = (isCorrect: boolean) => {
    if (isCorrect) {
      incrementCorrectAnswers();
    }
    incrementQuestionCount();
  };

  const handleContinue = () => {
    if (level < 5) {
      setLevel(level + 1);
      setQuestionCount(0);
      setShowLevelCompleteDialog(false);
      refetch(); // Refetch questions for the new level
    }
  };

  const handleQuizComplete = () => {
    setCurrentPage("result");
  };

  const handleLoginToContinue = () => {
    setIsRedirected(true);
    router.push("/auth/login");
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
        <DialogContent className="bg-white">
          <DialogHeader>
            <div className="flex justify-center">
              <Image
                src="/assets/Guzuha-02.jpg"
                alt="Level Complete"
                width={200}
                height={200}
              />
            </div>
            <DialogTitle className="text-xl tracking-wide">
              Level {level} Completed!
            </DialogTitle>
            <DialogDescription className="text-md">
              🎉 Congratulations
              <br /> You've completed level {level}. <br />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {user ? (
              <Button onClick={handleContinue}>
                Continue to Level {level + 1}
              </Button>
            ) : (
              <Button onClick={handleLoginToContinue}>
                Log In to Continue
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showQuizCompleteDialog}
        onOpenChange={setShowQuizCompleteDialog}
      >
        <DialogContent className="bg-white">
          <DialogHeader>
            <div className="flex justify-center">
              <Image
                src="/assets/Guzuha-02.jpg"
                alt="Level Complete"
                width={200}
                height={200}
              />
            </div>
            <DialogTitle className="text-xl">🎉 Congratulations</DialogTitle>
            <DialogDescription className="text-lg">
              You've completed all levels of the quiz.
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
