import { LearningState } from "@/lib/model/FlashCard";
import { createContext, useState } from "react";

export interface Answer {
  question: string;
  actual: string;
  expected: string;
  isCorrect: boolean;
  newState: LearningState;
}

export interface AnswerContextType {
  answers: Answer[];
  addAnswer: (
    question: string,
    answer: { actual: string; expected: string },
    state: LearningState,
  ) => void;
  clear: () => void;
}

export const AnswersContext = createContext<AnswerContextType | null>(null);

export default function AnswersContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const handleAddAnswer = (
    question: string,
    answer: { actual: string; expected: string },
    state: LearningState,
  ) => {
    setAnswers((prev) =>
      prev.concat({
        question,
        ...answer,
        isCorrect: answer.actual === answer.expected,
        newState: state,
      }),
    );
  };
  const clear = () => {
    setAnswers([]);
  };

  const ctxValue: AnswerContextType = {
    answers: answers,
    addAnswer: handleAddAnswer,
    clear: clear,
  };

  return (
    <AnswersContext.Provider value={ctxValue}>
      {children}
    </AnswersContext.Provider>
  );
}
