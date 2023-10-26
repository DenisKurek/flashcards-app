import User from "@/lib/model/User";
import { hashPassword } from "@/lib/utils/auth";
import { conntectToDatabase } from "@/lib/utils/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  const { email, password } = data;

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid input" }, { status: 422 });
  }
  if (!password || password.trim().length < 5) {
    return NextResponse.json(
      { error: "Password is too weak" },
      { status: 422 },
    );
  }

  const client = await conntectToDatabase();
  const collection = client.db().collection("users");

  const existingUser = await collection.findOne({ email: email });

  if (existingUser) {
    client.close();
    return NextResponse.json(
      { error: "User allready exists" },
      { status: 422 },
    );
  }

  const hashedPassword = await hashPassword(password);
  const hashedUser: User = {
    email: email,
    password: hashedPassword,
  };

  const result = await collection.insertOne(hashedUser);
  client.close();
  return NextResponse.json({ result }, { status: 201 });
}
