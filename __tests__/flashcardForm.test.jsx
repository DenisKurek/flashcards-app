import { render, screen } from "@testing-library/react";
import FlashcardForm from "../components/edit-set/FlashcardForm";
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

describe("Page", () => {
  it("renders a heading", () => {
    render(
      <FlashcardForm
        flashCard={mockFlashcard}
        language={mockLanguageSettings}
        onUpdate={() => {}}
        onDelete={() => {}}
        onLanguageChange={() => {}}
      />,
    );

    const flashCard = screen.getByTestId("flashcardForm");
    expect(flashCard).toBeInTheDocument();
    expect(flashCard.querySelector("#concept-25")).toHaveValue("ala");
    expect(flashCard.querySelector("#definition-25")).toHaveValue("ma kota");
  });
});
