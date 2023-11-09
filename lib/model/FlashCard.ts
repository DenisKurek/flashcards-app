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

export const getStateColor = (state: LearningState) => {
  switch (state) {
    case LearningState.NOT_STARTED:
      return "bg-red-900";
    case LearningState.RECENTLY_STARTED:
      return "bg-red-200";
    case LearningState.LEARNING:
      return "bg-yellow-400";
    case LearningState.ALMOST_MASTERED:
      return "bg-green-200";
    case LearningState.MASTERED:
      return "bg-green-500";
  }
};
