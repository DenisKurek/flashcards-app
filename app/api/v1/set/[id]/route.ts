import { conntectToDatabase } from "@/lib/utils/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log("return params id  =", params.id);
  console.log("return params id  =", params.id);
  const client = await conntectToDatabase();
  const db = client.db();
  const collection = db.collection("sets");
  const set = await collection.findOne(new ObjectId(params.id));
  console.log("return value =", set);
  return NextResponse.json({ set });
}
