export type QuestionType = {
    id: number,
    imageClassName?: string,
    title?: string,
    link?: string,
    label: string,
}

export type OptionType = {
    label: string,
    image?: string,
    isCorrect?: boolean,
}

export type AnswerType = {
    id: number,
    options: OptionType[],
}

export type QuizList = {
    id: number,
    question: QuestionType,
    answer: AnswerType,
}[];

