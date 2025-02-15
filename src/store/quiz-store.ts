import { create } from "zustand";
import { persist } from "zustand/middleware";

interface QuizState {
  level: number;
  correctAnswers: number;
  questionCount: number;
  startTime: number | null;
  endTime: number | null;
  isCompleted: boolean;
  isRedireted: boolean;
  setLevel: (level: number) => void;
  setIsRedirected: (isRedirected: boolean) => void;
  incrementCorrectAnswers: () => void;
  incrementQuestionCount: () => void;
  setQuestionCount: (count: number) => void;
  setIsCompleted: () => void;
  setStartTime: () => void;
  setEndTime: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      level: 1,
      isRedireted: false,
      correctAnswers: 0,
      questionCount: 0,
      startTime: null,
      endTime: null,
      isCompleted: false,
      setLevel: (level) => set({ level }),
      incrementCorrectAnswers: () =>
        set((state) => ({ correctAnswers: state.correctAnswers + 1 })),
      incrementQuestionCount: () =>
        set((state) => ({ questionCount: state.questionCount + 1 })),
      setStartTime: () => set({ startTime: Date.now() }),
      setEndTime: () => set({ endTime: Date.now() }),
      setIsCompleted: () => set({ isCompleted: true }),
      setIsRedirected: (isRedirected) => set({ isRedireted: isRedirected }),
      setQuestionCount: (count) => set({ questionCount: count }),
      resetQuiz: () =>
        set({
          level: 1,
          correctAnswers: 0,
          questionCount: 0,
          startTime: null,
          endTime: null,
          isCompleted: false,
        }),
    }),
    {
      name: "quiz-storage",
    }
  )
);
