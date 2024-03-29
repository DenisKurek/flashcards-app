import Flashcard from "@/lib/model/FlashCard";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState, useRef } from "react";
import EditIcon from "../ui/EditIcon";
import FlipIcon from "../ui/FlipIcon";

interface Props<> {
  onSubmit: (e: SyntheticEvent, actual: string, expected: string) => void;
  flashCard: Flashcard;
  setId?: string;
}

const LearnFlashcardForm: React.FC<Props> = (props) => {
  const router = useRouter();
  const [fliped, setFliped] = useState<boolean>(true);
  const [placecholder, setPlacecholder] = useState<string>();
  const [answer, setAnswer] = useState<string>("");
  const [borderColor, setborderColor] = useState<string | undefined>();

  const getDisplayedPart = (fliped: boolean) => {
    return fliped ? props.flashCard.concept : props.flashCard.definition;
  };

  const getHiddenPart = (fliped: boolean) => {
    return !fliped ? props.flashCard.concept : props.flashCard.definition;
  };

  const handleFlip = () => {
    setPlacecholder(undefined);
    setFliped((prev) => !prev);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const correctValue = getHiddenPart(fliped);
    setborderColor(
      answer === correctValue && !placecholder
        ? "input-success"
        : "input-error",
    );
    setTimeout(() => {
      props.onSubmit(e, answer, correctValue);
      setborderColor(undefined);
      setAnswer("");
      setPlacecholder(undefined);
    }, 2_000);
  };

  return (
    <form className="card min-w-fit bg-neutral" onSubmit={handleSubmit}>
      <div className="card-body">
        <div className="card-actions justify-end">
          <FlipIcon onClick={handleFlip} />
          {props.setId && (
            <EditIcon onClick={() => router.push(`/edit-set/${props.setId}`)} />
          )}
        </div>
        <h2 className="card-title justify-center">
          {getDisplayedPart(fliped)}
        </h2>

        <label htmlFor="answer" className="label">
          Answer :
        </label>
        <input
          id="answer"
          type="text"
          className={`input ${borderColor ? borderColor : "input-primary"}`}
          value={answer}
          onChange={(e) => setAnswer(e.currentTarget.value)}
          placeholder={placecholder}
        />

        <div className="card-actions justify-end">
          <div
            className="btn btn-ghost text-secondary"
            onClick={() => setPlacecholder(getHiddenPart(fliped))}
          >
            Dont Remember
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default LearnFlashcardForm;
