"use client";
import SetSearchForm from "@/components/SerchSetForm";
import SetsList from "@/components/SetsList";
import Set, { SearchParameters } from "@/lib/model/Set";
import { useState } from "react";

export default function FindSet() {
  const [sets, setSets] = useState<Set[]>([]);
  const handleSubmit = async (parameters: SearchParameters) => {
    const response = await fetch("/api/set/search", {
      method: "POST",
      body: JSON.stringify(parameters),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setSets(data.sets);
    return response;
  };

  return sets.length > 0 ? (
    <SetsList sets={sets} />
  ) : (
    <SetSearchForm onSubmit={handleSubmit} />
  );
}
