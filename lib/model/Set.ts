import { ObjectId } from "mongodb";
import Flashcard from "./FlashCard";

export default interface Set extends SetBlueprint{
  _id: ObjectId;
  name: string;
  flashcards: Flashcard[];
}

export interface SetBlueprint {
  name: string;
  flashcards: Flashcard[];
}
