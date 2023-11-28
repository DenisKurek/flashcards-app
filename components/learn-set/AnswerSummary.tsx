import { Answer } from "@/store/Learning-set-Context";

interface Props<> {
  index: number;
  answer: Answer;
}

function getColor(isCorrect: boolean) {
  return isCorrect ? "bg-green-500" : "bg-red-500";
}

const AnswerSummary: React.FC<Props> = (props) => {
  return (
    <tr className={getColor(props.answer.isCorrect)}>
      <th>{props.index}</th>
      <td>{props.answer.actual}</td>
      <td>{props.answer.expected}</td>
      <td>{props.answer.newState}</td>
    </tr>
  );
};

export default AnswerSummary;
