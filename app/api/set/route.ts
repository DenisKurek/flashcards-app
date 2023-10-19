import Set from "@/lib/model/Set";
import { conntectToDatabase } from "@/lib/utils/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const set: Set = await request.json();
  const username = await getUsername();
  set.username = username;
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
    const username = await getUsername();
    const sets = await collection.find({ username: username }).toArray();
    client.close();
    return NextResponse.json({ sets });
  } catch (error) {
    console.log("ERROR");
    return new Response("ERROR", {
      status: 500,
    });
  }
}

async function getUsername() {
  const options: any = authOptions;
  const { user }: any = await getServerSession(options);
  return user.email;
}
