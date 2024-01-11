import { conntectToDatabase } from "../utils/db";

export async function getAllTags() {
  const client = await conntectToDatabase();
  const db = client.db();
  const collection = db.collection("tags");
  const tags = await collection.find().toArray();
  client.close();
  return tags.map((tag: any) => tag.tag);
}
