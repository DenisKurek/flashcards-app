import { conntectToDatabase } from "@/lib/utils/db";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const {tag} = await request.json();
    try {
      const client = await conntectToDatabase();
      const db = client.db();
      const collection = db.collection("tags");
      const result = await collection.insertOne(tag);
      client.close();
      return NextResponse.json({ result });
    } catch (error) {
      return new Response("ERROR", {
        status: 500,
      });
    }
  }

export async function GET(request: Request) {
    try {
      const client = await conntectToDatabase();
      const db = client.db();
      const collection = db.collection("tags");
      const tags = await collection.find().toArray();
      client.close();
      return NextResponse.json({ tags });
    } catch (error) {
      return new Response("ERROR", {
        status: 500,
      });
    }
  }