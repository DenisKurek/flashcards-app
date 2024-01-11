import { ObjectId } from "mongodb";
import Set, { SetBlueprint } from "../model/Set";
import { conntectToDatabase } from "../utils/db";

export async function getSetRequest(id: string) {
  const response = await fetch(`/api/set/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("error");
  }
  const data = await response.json();
  return data.set;
}

export async function getAllSetsRequest() {
  const response = await fetch("/api/set", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

export async function updateSetRequest(set: Set) {
  const blueprint: SetBlueprint = set;
  const response = await fetch(`/api/set/${set._id.toString()}`, {
    method: "PUT",
    body: JSON.stringify({
      ...blueprint,
      username: set.username,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
