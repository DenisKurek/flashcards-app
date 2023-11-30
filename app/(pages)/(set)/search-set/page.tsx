"use client";
import SetSearchForm from "@/components/SerchSetForm";
import SetsList from "@/components/SetsList";
import Set, { SearchParameters } from "@/lib/model/Set";
import { useState } from "react";

export default function FindSet() {
  const [sets, setSets] = useState<Set[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const handleSubmit = async (parameters: SearchParameters) => {
    setError(undefined);
    const response = await fetch("/api/set/search", {
      method: "POST",
      body: JSON.stringify(parameters),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    data.sets.length > 0
      ? setSets(data.sets)
      : setError("No messages maching criteria were found");
    return response;
  };

  return sets.length > 0 ? (
    <SetsList sets={sets} />
  ) : (
    <SetSearchForm error={error} onSubmit={handleSubmit} />
  );
}
