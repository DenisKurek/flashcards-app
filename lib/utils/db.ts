import { MongoClient } from "mongodb";

export async function conntectToDatabase() {
  const uri = process.env.MONGODB_URI;
  if (uri == undefined) {
    throw new Error("MONGODB_URI is undefined");
  }
  const client = await MongoClient.connect(uri);
  return client;
}
