import { ObjectId } from "mongodb";

export default interface Flashcard extends FlashcardBlueprint{
  id: number;
}

export interface FlashcardBlueprint {
  concept: string;
  definition: string;
}