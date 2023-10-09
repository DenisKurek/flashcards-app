import { MongoClient } from "mongodb";

export async function conntectToDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@flashcards.nsiphmq.mongodb.net/?retryWrites=true&w=majority`
  );

  return client;
}
