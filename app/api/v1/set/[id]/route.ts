import { conntectToDatabase } from "@/lib/utils/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { id: ObjectId } }, request: Request) {
    try {
      const client = await conntectToDatabase();
      const db = client.db();
      const collection = db.collection("sets");
      const sets = await collection.find({_id: params.id}).toArray;
      return NextResponse.json({ sets });
    } catch (error) {
      console.log("ERROR");
      return new Response("ERROR", {
        status: 500,
      });
    }
  }