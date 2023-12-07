"use client";
import SetSearchForm from "@/components/SerchSetForm";
import Set, { SearchParameters } from "@/lib/model/Set";
import { useState } from "react";

export default function FindSet() {
  const [sets, setSets] = useState<Set[] | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const handleSubmit = async (parameters: SearchParameters) => {
    setError(undefined);
    setSets(undefined);
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

  return <SetSearchForm sets={sets} error={error} onSubmit={handleSubmit} />;
}
