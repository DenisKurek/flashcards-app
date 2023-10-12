"use client";

import { useState, useEffect } from "react";
import Set from "@/lib/model/Set";

export default function Page({ params }: { params: { id: string } }) {
  const [set, setSet] = useState<Set>();
  useEffect(() => {
    async function getSet() {
      const response = await fetch(`/api/v1/set/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("response -> ", response);
      if (!response.ok) {
        throw console.error(response);
      }
      const data = await response.json();

      console.log("set -> ", data);
      setSet(data);
    }
    getSet();
  }, [params.id]);

  return <div>{JSON.stringify(set)}</div>;
}
