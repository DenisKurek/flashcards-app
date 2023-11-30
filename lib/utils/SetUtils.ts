import Flashcard from "../model/FlashCard";
import Set from "../model/Set";

export function updateAllSets(sets: Set[], flashcards: Flashcard[]): Set[] {
  return sets.map((set) => updateSet(set, flashcards));
}

export function updateSet(set: Set, flashcards: Flashcard[]): Set {
  const updatedSet = { ...set };
  updatedSet.flashcards.map((flashCard, index) => {
    flashcards.forEach((updatedFlashcard) => {
      if (flashCard.id === updatedFlashcard.id) {
        return updatedFlashcard;
      }
    });
    return flashCard;
  });
  return updatedSet;
}
