import React from "react";
import { State } from "../page";
import { ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/store/quiz-store";
import Image from "next/image";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<State>>;
}

const QuizLanding = ({ setCurrentPage }: Props) => {
  const { isRedireted, setIsRedirected } = useQuizStore();
  return (
    <section className="grid grid-cols-1 md:grid-cols-3">
      <div className="mx-auto md:col-span-2 max-w-screen-xl px-4 py-32">
        <div className="mx-auto max-w-xl text-center">
          {/* <div className="w-fit rounded-full bg-red-400/10 p-6 mb-5 mx-auto">
            <ClipboardList size={40} />
          </div> */}
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
      <div>Leaderboard</div>
    </section>
  );
};

export default QuizLanding;
