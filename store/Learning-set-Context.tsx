import { createContext, useState } from "react";

export interface Answer {
  actual: string;
  expected: string;
  isCorrect: boolean;
}

export interface AnswerContextType {
  answers: Answer[];
  addAnswer: (answer: { actual: string; expected: string }) => void;
}

export const AnswersContext = createContext<AnswerContextType  | null>(null);

export default function AnswersContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const handleAddAnswer = (answer: { actual: string; expected: string }) => {
    setAnswers((prev) =>
      prev.concat({ ...answer, isCorrect: answer.actual === answer.expected }),
    );
  };

  const ctxValue: AnswerContextType  = {
    answers: answers,
    addAnswer: handleAddAnswer,
  };

  return (
    <AnswersContext.Provider value={ctxValue}>
      {children}
    </AnswersContext.Provider>
  );
}
