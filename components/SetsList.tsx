"use client";
import { useEffect, useState } from "react";
import Set from "@/lib/model/Set";

const SetsList = () => {
  const [sets, setSets] = useState<Set[]>([]);
  useEffect(() => {
    async function getSets() {
      const response = await fetch("api/v1/set", {
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
          <li className=" list-group-item m-2" key={index}>
            {set.name}
          </li>
        ))}
      </div>
    </ul>
  );
};

export default SetsList;
