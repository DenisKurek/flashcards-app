"use client";
import { useState, useEffect } from "react";
import Set, { SetBlueprint } from "@/lib/model/Set";
import SetEditionForm from "@/components/edit-set/SetEditionForm";
import { useRouter } from "next/navigation";
import LoadingPage from "@/app/loading";
import { useSession } from "next-auth/react";

export default function Page({ params }: { params: { id: string } }) {
  const [set, setSet] = useState<Set>();
  const router = useRouter();
  const { data: session, status } = useSession();

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

  const importSet = async (set: SetBlueprint) => {
    const response = await fetch("/api/set", {
      method: "POST",
      body: JSON.stringify(set),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      router.push("/");
    }
  };

  return set ? (
    session?.user == null || session?.user.email === set.username ? (
      <SetEditionForm set={set} onSubmit={updateSet} />
    ) : (
      <SetEditionForm
        set={set}
        onSubmit={importSet}
        submitButtonLabel={"Import"}
      />
    )
  ) : (
    <LoadingPage />
  );
}
