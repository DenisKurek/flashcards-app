import { LanguageSettings, SearchParameters } from "@/lib/model/Set";
import { conntectToDatabase } from "@/lib/utils/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const searchParams: SearchParameters = await request.json();
  try {
    const client = await conntectToDatabase();
    const db = client.db();
    const collection = db.collection("sets");
    const languageSettings: LanguageSettings = {
      concept: searchParams.fromLanguage,
      definition: searchParams.toLanguage,
    };
    const sets = await collection
      .find({ language: languageSettings, tags: { $in: searchParams.tags } })
      .toArray();
    client.close();
    return NextResponse.json({ sets });
  } catch (error) {
    return new Response("ERROR", {
      status: 500,
    });
  }
}
