"use client";
import { useEffect, useState } from "react";
import Set from "@/lib/model/Set";
import Link from "next/link";
import LoadingPage from "@/app/loading";
import { useRouter } from "next/navigation";

const SetsList = () => {
  const [sets, setSets] = useState<Set[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    async function getSets() {
      setLoading(true);
      const response = await fetch("api/set", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.redirected) {
        router.replace("/login");
        return;
      }

      const { sets } = await response.json();
      setSets(sets);
      setLoading(false);
    }
    getSets();
  }, []);
  return loading ? (
    <LoadingPage />
  ) : (
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
