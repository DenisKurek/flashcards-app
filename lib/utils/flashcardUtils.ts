import Flashcard, { LearningState } from "../model/FlashCard";

export function updateFlashcard(flashcard: Flashcard, correct: boolean) {
  if (!correct) {
    flashcard.state = LearningState.NOT_STARTED;
    return flashcard;
  }
  flashcard.state = updateState(flashcard.state);
  return flashcard;
}

function updateState(state: LearningState) {
  switch (state) {
    case LearningState.NOT_STARTED:
      return LearningState.RECENTLY_STARTED;
    case LearningState.RECENTLY_STARTED:
      return LearningState.LEARNING;
    case LearningState.LEARNING:
      return LearningState.ALMOST_MASTERED;
    case LearningState.ALMOST_MASTERED:
      return LearningState.MASTERED;
    case LearningState.MASTERED:
      return LearningState.MASTERED;
  }
}
