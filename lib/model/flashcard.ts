import { ObjectId } from "mongodb";

export default interface Flashcard extends FlashcardBlueprint{
  _id: ObjectId;
}

export interface FlashcardBlueprint {
  concept: string;
  definition: string;
}