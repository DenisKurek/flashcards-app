export default interface Flashcard extends FlashcardBlueprint {
  id: number;
}

export interface FlashcardBlueprint {
  concept: string;
  definition: string;
  state: LearningState;
}

export enum LearningState {
  NOT_STARTED = "Not Started",
  RECENTLY_STARTED = "Recently Strarted",
  LEARNING = "Learning",
  ALMOST_MASTERED = "Almost Mastered",
  MASTERED = "Mastered",
}
