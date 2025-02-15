import React from "react";
import { State } from "../page";
import { ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/store/quiz-store";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<State>>;
}

const QuizLanding = ({ setCurrentPage }: Props) => {
  const { isRedireted, setIsRedirected } = useQuizStore();
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <div className="w-fit rounded-full bg-red-400/10 p-6 mb-5 mx-auto">
            <ClipboardList size={40} />
          </div>
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
            <Button
              variant={"outline"}
              onClick={() => {
                setCurrentPage("leaderboard");
              }}
            >
              View Leaderboard
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizLanding;
