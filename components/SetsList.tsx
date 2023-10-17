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

      console.log(sets);
      setSets(sets);
    }
    getSets();
  }, []);
  return (
    <ul className=" list-group d-flex justify-content-evenly">
      <div className="row">
        {sets.map((set, index) => (
          <Link
            href={`edit-set/${set._id?.toString()}`}
            className=" list-group-item m-2"
            key={index}
          >
            {set.name}
          </Link>
        ))}
      </div>
    </ul>
  );
};

export default SetsList;
