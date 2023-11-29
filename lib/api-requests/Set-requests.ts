import Set, { SetBlueprint } from "../model/Set";

export async function getSetRequest(id: string) {
  const response = await fetch(`/api/set/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw console.error(response);
  }
  const data = await response.json();
  return data.set;
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
