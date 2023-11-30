export default interface Flashcard extends FlashcardBlueprint {
  id: number;
}

export interface FlashcardBlueprint {
  concept: string;
  definition: string;
  state: LearningState;
  lastUpdate: Date;
}

export enum LearningState {
  NOT_STARTED = "Not Started",
  RECENTLY_STARTED = "Recently Strarted",
  LEARNING = "Learning",
  ALMOST_MASTERED = "Almost Mastered",
  MASTERED = "Mastered",
}

export const StateColor = {
  [LearningState.NOT_STARTED]: "bg-red-900",
  [LearningState.RECENTLY_STARTED]: "bg-red-200",
  [LearningState.LEARNING]: "bg-yellow-400",
  [LearningState.ALMOST_MASTERED]: "bg-green-200",
  [LearningState.MASTERED]: "bg-green-500",
};
