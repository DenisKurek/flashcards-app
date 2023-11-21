import Flashcard from "@/lib/model/FlashCard";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import EditIcon from "../ui/EditIcon";
import FlipIcon from "../ui/FlipIcon";

interface Props<> {
  onSubmit: (e: SyntheticEvent) => void;
  flashCard: Flashcard;
  setId: string;
}

const LearnFlashcardForm: React.FC<Props> = (props) => {
  const router = useRouter();
  const [fliped, setFliped] = useState<boolean>(true);
  const [placecholder, setPlacecholder] = useState<string>();

  const getDisplayedPart = (fliped: boolean) => {
    return fliped ? props.flashCard.concept : props.flashCard.definition;
  };

  const getHiddenPart = (fliped: boolean) => {
    return !fliped ? props.flashCard.concept : props.flashCard.definition;
  };

  return (
    <form className="card bg-neutral" onSubmit={props.onSubmit}>
      <div className="card-body">
        <div className="card-actions justify-end">
          <FlipIcon onClick={() => setFliped((prev) => !prev)} />
          <EditIcon onClick={() => router.push(`/edit-set/${props.setId}`)} />
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
          className="input input-bordered input-primary"
          placeholder={placecholder && placecholder}
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
