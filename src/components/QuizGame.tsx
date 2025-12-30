import {Question} from "./Question/Question";
import {Answers} from "./Answers/Answers";
import React, {useState} from "react";
import {QUIZ_LIST} from "../constants/constants";

export const QuizGame = ({ onNextStage, addAnswer }: { onNextStage: () => void, addAnswer: (ans: string) => void }) => {
    const [stageId, setStateId] = useState(9);
    const currentQuizItem = QUIZ_LIST[stageId];

    const handleSubmit = () => {
        if (stageId + 1 > QUIZ_LIST.length - 1) {
            onNextStage();
            return;
        }

        setStateId(stageId + 1)
    }

    const handleBack = () => {
        if (stageId === 0) {
            return;
        }
        setStateId(stageId - 1)
    }

    return (
        <>
            {
                currentQuizItem &&
                <>
                    <Question
                        link={currentQuizItem?.question.link}
                        title={currentQuizItem?.question.title}
                        label={currentQuizItem?.question.label}
                        imageClassName={currentQuizItem.question.imageClassName}
                        id={currentQuizItem.id}
                        onBack={handleBack}
                        questionsCount={QUIZ_LIST.length}
                    />
                    <Answers
                        addAnswer={addAnswer}
                        id={stageId}
                        options={currentQuizItem?.answer.options}
                        onClick={handleSubmit}
                    />
                </>
            }
        </>
    )
}