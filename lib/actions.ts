"use server";
import { getUsername } from "./utils/auth";
import { conntectToDatabase } from "./utils/db";
import Flashcard, { LearningState } from "./model/FlashCard";
import Set from "./model/Set";

export async function searchForSet(prevState: any, formData: FormData) {
  const client = await conntectToDatabase();
  const db = client.db();
  const collection = db.collection("sets");

  const languageSettings = {
    concept: formData.get("language-from")?.toString(),
    definition: formData.get("language-to")?.toString(),
  };

  const result: any = await collection
    .find({
      language: languageSettings,
      tags: { $in: formData.getAll("tag").map((tag) => tag.toString()) },
    })
    .toArray();
  client.close();

  const username = await getUsername();
  const sets = result
    .filter((set: Set) => set.username !== username)
    .map((set: Set) => {
      return {
        ...set,
        _id: set._id.toString(),
        flashcards: set.flashcards.map((flashcard: Flashcard) => {
          return { ...flashcard, state: LearningState.NOT_STARTED };
        }),
      };
    });
  return sets;
}
