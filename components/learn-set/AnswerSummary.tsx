import { StateColor } from "@/lib/model/FlashCard";
import { Answer } from "@/store/Learning-set-Context";

interface Props<> {
  index: number;
  answer: Answer;
}

function getColor(isCorrect: boolean) {
  return isCorrect ? "bg-green-500" : "bg-red-500";
}

const AnswerSummary: React.FC<Props> = (props) => {
  const state = props.answer.newState;
  return (
    <tr key={props.index} className={getColor(props.answer.isCorrect)}>
      <th>{props.index}</th>
      <td>{props.answer.actual}</td>
      <td>{props.answer.expected}</td>
      <td
        className={`${state && StateColor[state]} badge m-2 gap-2 text-black`}
      >
        {state + ": "}
      </td>
    </tr>
  );
};

export default AnswerSummary;
