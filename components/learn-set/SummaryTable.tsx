import {
  AnswerContextType,
  AnswersContext,
} from "@/store/Learning-set-Context";
import { useContext } from "react";
import AnswerSummary from "./AnswerSummary";

const SummaryTable: React.FC = () => {
  const ctx = useContext(AnswersContext) as AnswerContextType;
  return (
    <table className="table text-center">
      <thead>
        <tr>
          <th>id</th>
          <th>Your Answer</th>
          <th>Correct Answer</th>
          <th>new State</th>
        </tr>
      </thead>
      <tbody className=" text-black">
        {ctx.answers.map((answer, index) => (
          <AnswerSummary index={index} answer={answer} />
        ))}
      </tbody>
    </table>
  );
};

export default SummaryTable;
