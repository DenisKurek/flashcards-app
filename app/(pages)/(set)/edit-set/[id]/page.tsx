"use client";
import { useState, useEffect } from "react";
import Set, { SetBlueprint } from "@/lib/model/Set";
import SetEditionForm from "@/components/edit-set/SetEditionForm";
import { useRouter } from "next/navigation";
import LoadingPage from "@/app/(pages)/loading";
import { useSession } from "next-auth/react";
import {
  getSetRequest,
  updateSetRequest,
} from "@/lib/api-requests/Set-requests";

export default function Page({ params }: { params: { id: string } }) {
  const [set, setSet] = useState<Set>();
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    async function getSet() {
      try {
        const data = await getSetRequest(params.id);
        setSet(data);
      } catch (error) {
        console.log(error);
      }
    }
    getSet();
  }, [params.id]);

  const updateSet = async (setBlueprint: SetBlueprint) => {
    if (set === undefined) {
      return Error("Set value is not defined");
    }
    const response = await updateSetRequest({
      ...setBlueprint,
      _id: set._id,
      username: set.username,
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
