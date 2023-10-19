import { conntectToDatabase } from "@/lib/utils/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import Set, { SetBlueprint } from "@/lib/model/Set";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
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
  { params }: { params: { id: string } }
) {
  const client = await conntectToDatabase();
  const db = client.db();
  const collection = db.collection("sets");

  const set:SetBlueprint = await request.json()
  const result = await collection.replaceOne({_id: new ObjectId(params.id)},set)
  console.log("result: ",result);
  client.close();
  return NextResponse.json({ set },{status:200});
}
