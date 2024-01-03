import { isRepeatable } from "../lib/utils/flashcardUtils";
import { LearningState } from "../lib/model/FlashCard";

const mockFlashcard = {
  id: 25,
  concept: "ala",
  definition: "ma kota",
  state: LearningState.LEARNING,
  lastUpdate: new Date(),
};

const mockLanguageSettings = {
  concept: "Polish",
  definition: "English",
};

describe("isRepeatable tests", () => {
  it("NOT_STARTED state", () => {
    expect(
      isRepeatable({
        ...mockFlashcard,
        state: LearningState.NOT_STARTED,
        lastUpdate: new Date(),
      }),
    ).toBe(true);
  });

  it("RECENTLY_STARTED state", () => {
    expect(
      isRepeatable({
        ...mockFlashcard,
        state: LearningState.RECENTLY_STARTED,
        lastUpdate: new Date(),
      }),
    ).toBe(false);

    expect(
      isRepeatable({
        ...mockFlashcard,
        state: LearningState.RECENTLY_STARTED,
        lastUpdate: new Date().setDate(new Date().getDate() - 2),
      }),
    ).toBe(true);
  });

  it("LEARNING state", () => {
    expect(
      isRepeatable({
        ...mockFlashcard,
        state: LearningState.LEARNING,
        lastUpdate: new Date(),
      }),
    ).toBe(false);

    expect(
      isRepeatable({
        ...mockFlashcard,
        state: LearningState.LEARNING,
        lastUpdate: new Date().setDate(new Date().getDate() - 2),
      }),
    ).toBe(false);

    expect(
      isRepeatable({
        ...mockFlashcard,
        state: LearningState.LEARNING,
        lastUpdate: new Date().setDate(new Date().getDate() - 8),
      }),
    ).toBe(true);
  });

  it("ALMOST_MASTERED state", () => {
    expect(
      isRepeatable({
        ...mockFlashcard,
        state: LearningState.ALMOST_MASTERED,
        lastUpdate: new Date(),
      }),
    ).toBe(false);

    expect(
      isRepeatable({
        ...mockFlashcard,
        state: LearningState.ALMOST_MASTERED,
        lastUpdate: new Date().setDate(new Date().getDate() - 8),
      }),
    ).toBe(false);

    expect(
      isRepeatable({
        ...mockFlashcard,
        state: LearningState.ALMOST_MASTERED,
        lastUpdate: new Date().setDate(new Date().getDate() - 31),
      }),
    ).toBe(true);
  });

  it("MASTERED state", () => {
    expect(
      isRepeatable({
        ...mockFlashcard,
        state: LearningState.MASTERED,
        lastUpdate: new Date(),
      }),
    ).toBe(false);

    expect(
      isRepeatable({
        ...mockFlashcard,
        state: LearningState.MASTERED,
        lastUpdate: new Date().setDate(new Date().getDate() - 31),
      }),
    ).toBe(false);

    expect(
      isRepeatable({
        ...mockFlashcard,
        state: LearningState.MASTERED,
        lastUpdate: new Date().setDate(new Date().getDate() - 366),
      }),
    ).toBe(true);
  });
});
