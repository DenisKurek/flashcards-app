import Set from "@/lib/model/Set";
import { conntectToDatabase } from "@/lib/utils/db";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const set: Set = await request.json();
  try {
    const client = await conntectToDatabase();
    const db = client.db();
    const collection = db.collection("sets");
    const result = await collection.insertOne(set);
    client.close();
    return NextResponse.json({ result });
  } catch (error) {
    console.log("ERROR");
    return new Response("ERROR", {
      status: 500,
    });
  }
}

export async function GET(request: Request) {
  try {
    const client = await conntectToDatabase();
    const db = client.db();
    const collection = db.collection("sets");
    const sets = await collection.find({}).toArray();
    client.close();
    return NextResponse.json({ sets });
  } catch (error) {
    console.log("ERROR");
    return new Response("ERROR", {
      status: 500,
    });
  }
}
