"use client";
import { useState, useEffect } from "react";
import Set, { SetBlueprint } from "@/lib/model/Set";
import SetEditionForm from "@/components/edit-set/SetEditionForm";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const [set, setSet] = useState<Set>();
  const router = useRouter();

  useEffect(() => {
    async function getSet() {
      const response = await fetch(`/api/set/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw console.error(response);
      }
      const data = await response.json();
      setSet(data.set);
    }
    getSet();
  }, [params.id]);

  const updateSet = async (SetBlueprint: SetBlueprint) => {
    if (set === undefined) {
      return Error("Set value is not defined");
    }
    const response = await fetch(`/api/set/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...SetBlueprint,
        username: set.username,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      router.push("/");
    }
  };

  return set ? (
    <SetEditionForm set={set} onSubmit={updateSet} />
  ) : (
    <p>Loading...</p>
  );
}
