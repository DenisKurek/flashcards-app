"use client";
import { useEffect, useState } from "react";
import Set from "@/lib/model/Set";
import Link from "next/link";

const SetsList = () => {
  const [sets, setSets] = useState<Set[]>([]);

  useEffect(() => {
    async function getSets() {
      const response = await fetch("api/set", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { sets } = await response.json();
      setSets(sets);
    }
    getSets();
  }, []);
  return (
    <ul className="container">
      {sets.map((set, index) => (
        <Link
          href={`edit-set/${set._id?.toString()}`}
          className="card m-5 flex bg-secondary p-4 "
          key={index}
        >
          {set.name}
        </Link>
      ))}
    </ul>
  );
};

export default SetsList;
