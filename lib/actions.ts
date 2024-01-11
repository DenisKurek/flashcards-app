"use server";
import { LanguageSettings } from "./model/Set";
import { getUsername } from "./utils/auth";
import { conntectToDatabase } from "./utils/db";
import Set from "./model/Set";
import { LearningState } from "./model/FlashCard";
import { redirect } from "next/dist/server/api-utils";

export async function searchForSet(prevState: any, formData: FormData) {
  const client = await conntectToDatabase();
  const db = client.db();
  const collection = db.collection("sets");

  const languageSettings: LanguageSettings = {
    concept: formData.get("language-from").toString(),
    definition: formData.get("language-to").toString(),
  };

  const result: Set[] = await collection
    .find({
      language: languageSettings,
      tags: { $in: formData.getAll("tag").map((tag) => tag.toString()) },
    })
    .toArray();
  client.close();

  const username = await getUsername();
  const sets = result
    .filter((set) => set.username !== username)
    .map((set) => {
      return {
        ...set,
        _id: set._id.toString(),
        flashcards: set.flashcards.map((flashcard) => {
          return { ...flashcard, state: LearningState.NOT_STARTED };
        }),
      };
    });
  return sets;
}
