import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { hash, compare } from "bcryptjs";
import { getServerSession } from "next-auth";

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export async function getUsername() {
  const options: any = authOptions;
  const { user }: any = await getServerSession(options);
  return user.email;
}
