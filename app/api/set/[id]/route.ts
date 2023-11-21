import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { conntectToDatabase } from "@/lib/utils/db";
import Set, { SetBlueprint } from "@/lib/model/Set";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const client = await conntectToDatabase();
  const db = client.db();
  const collection = db.collection("sets");
  const set = await collection.findOne(new ObjectId(params.id));
  client.close();
  return NextResponse.json({ set });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const client = await conntectToDatabase();
  const db = client.db();
  const collection = db.collection("sets");
  const set: Set = await request.json();
  const updatedSet: SetBlueprint = {
    name: set.name,
    tags: set.tags,
    flashcards: set.flashcards,
    language: set.language,
  };

  const result = await collection.replaceOne(
    { _id: new ObjectId(params.id) },
    { ...updatedSet, username: set.username },
  );

  console.log(result);

  client.close();
  return NextResponse.json({ set }, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const client = await conntectToDatabase();
  const db = client.db();
  const collection = db.collection("sets");

  const result = await collection.deleteOne({ _id: new ObjectId(params.id) });

  client.close();
  return NextResponse.json({ result }, { status: 200 });
}
