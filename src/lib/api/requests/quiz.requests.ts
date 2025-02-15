import axios from "axios"
import { Question } from "../routes/question.route"
import { QuizResponse } from "@/types/quiz.types";
import { useQuery } from "@tanstack/react-query";

export const getQuestions = async (level: number) => {
    const res = await axios.get(Question.get(level));
    return res.data as QuizResponse;
}

export const useGetQuestions = (level = 1) => {
    return useQuery({
        queryKey: ['questions'],
        queryFn: () => getQuestions(level)
    })
}