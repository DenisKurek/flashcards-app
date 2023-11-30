import Flashcard, { LearningState } from "../model/FlashCard";

export function updateFlashcard(flashcard: Flashcard, correct: boolean) {
  flashcard.lastUpdate = new Date();
  if (!correct) {
    flashcard.state = LearningState.NOT_STARTED;
    return flashcard;
  }
  flashcard.state = updateState(flashcard.state);
  return flashcard;
}

export function getRandomSubset(flashcards: Flashcard[]) {
  const MAX_INDEX = 10;
  return flashcards
    .slice()
    .filter((flashcard) => {
      console.log(isRepeatable(flashcard));
      return isRepeatable(flashcard);
    })
    .slice(0, Math.min(flashcards.length, MAX_INDEX))
    .sort(() => Math.random() - 0.5);
}

function isRepeatable(flashCard: Flashcard) {
  const currentDate = new Date();
  if (!flashCard.lastUpdate) {
    return true;
  }
  switch (flashCard.state) {
    case LearningState.NOT_STARTED:
      return true;
    case LearningState.RECENTLY_STARTED:
      return flashCard.lastUpdate < new Date(currentDate.getDate() - 1);
    case LearningState.LEARNING:
      return flashCard.lastUpdate < new Date(currentDate.getDate() - 7);
    case LearningState.ALMOST_MASTERED:
      return flashCard.lastUpdate < new Date(currentDate.getDate() - 30);
    case LearningState.MASTERED:
      return flashCard.lastUpdate < new Date(currentDate.getDate() - 365);
  }
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
