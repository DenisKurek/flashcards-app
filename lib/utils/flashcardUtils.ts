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
    .filter((flashcard) => isRepeatable(flashcard))
    .slice(0, Math.min(flashcards.length, MAX_INDEX))
    .sort(() => Math.random() - 0.5);
}

function isRepeatable(flashCard: Flashcard) {
  const currentDate = new Date();
  const updateDate = new Date(flashCard.lastUpdate);
  if (!flashCard.lastUpdate) {
    return true;
  }
  switch (flashCard.state) {
    case LearningState.NOT_STARTED:
      return true;
    case LearningState.RECENTLY_STARTED:
      return updateDate < beforeDays(currentDate, 1);
    case LearningState.LEARNING:
      return updateDate < beforeDays(currentDate, 7);
    case LearningState.ALMOST_MASTERED:
      return updateDate < beforeDays(currentDate, 30);
    case LearningState.MASTERED:
      return updateDate < beforeDays(currentDate, 365);
  }
}

function beforeDays(date: Date, days: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() - days);
  return newDate;
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
