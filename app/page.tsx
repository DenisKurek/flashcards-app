"use client";
import SetsList from "@/components/SetsList";
import Set from "@/lib/model/Set";
import { ObjectId } from "mongodb";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingPage from "./loading";

export default function HomePage() {
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

  const HandleSetDelete = async (id: ObjectId) => {
    const response = await fetch(`/api/set/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setSets((prev) => prev.filter((set) => set._id != id));
    }
  };

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="flex flex-grow">
      <SetsList sets={sets} onRemove={HandleSetDelete} />
    </div>
  );
}
