import { ObjectId } from "mongodb";
import Flashcard from "../ui-model/flashcard";

export default interface Set {
  _id: ObjectId | undefined;
  name: string;
  flashcards: Flashcard[];
}
