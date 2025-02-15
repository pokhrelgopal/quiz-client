import { SuccessResponse } from "@/types/response.types";


export type QuizResponse = SuccessResponse<{
    questions: Questions;
}>;



export interface Questions {
    test_group: number;
    question: Question[];
}

export interface Question {
    question: string;
    comment: string;
    test_answer: number;
    answers: string[];
}


