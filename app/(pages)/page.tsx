"use client";
import SetsList from "@/components/SetsList";
import { getAllSetsRequest } from "@/lib/api-requests/Set-requests";
import Set from "@/lib/model/Set";
import { ObjectId } from "mongodb";
import Link from "next/link";
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
      const response = await getAllSetsRequest();
      if (response.redirected) {
        router.push("/login");
      }
      const { sets } = await response.json();
      setSets(sets);
      setLoading(false);
    }
    getSets();
  }, []);

  const handleSetDelete = async (id: ObjectId) => {
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
    <div className="container ">
      <SetsList sets={sets} onRemove={handleSetDelete} />
      <Link
        href="/learn-set/daily-set"
        className="btn btn-secondary m-auto flex w-fit "
      >
        Generate Daily Set
      </Link>
    </div>
  );
}
