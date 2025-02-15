import React from "react";
import { State } from "../page";
import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/store/quiz-store";
import Image from "next/image";
import Leaderboard from "./Leaderboard";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<State>>;
}

const QuizLanding = ({ setCurrentPage }: Props) => {
  const { isRedireted, setIsRedirected } = useQuizStore();
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-16 mx-auto max-w-screen-xl">
      <div className="md:col-span-2 px-4 py-32">
        <div className="text-center">
          <Image
            src="/assets/Guzuha-02.jpg"
            alt="Quiz"
            width={300}
            height={300}
            className="mx-auto"
          />
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Welcome to
            <strong className="font-extrabold text-red-700">
              {" "}
              Guhuza Quiz{" "}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Test your knowledge with Guhuza Quiz! Challenge yourself with
            exciting questions and see how well you score. Ready to begin?{" "}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => {
                setIsRedirected(false);
                setCurrentPage("quiz");
              }}
            >
              {isRedireted ? "Continue Quiz" : "Start Quiz"}
            </Button>
          </div>
        </div>
      </div>
      <Leaderboard />
    </section>
  );
};

export default QuizLanding;
