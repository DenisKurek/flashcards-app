import { ObjectId } from "mongodb";
import Flashcard from "./FlashCard";

export default interface Set extends SetBlueprint {
  username: String;
  _id: ObjectId;
}

export interface SetBlueprint {
  name: string;
  tags: string[];
  flashcards: Flashcard[];
}
