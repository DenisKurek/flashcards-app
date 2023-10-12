'use client'
import { ObjectId } from "mongodb";
import { useState, useEffect } from "react";
import Set from "@/lib/model/Set";


export default function ({ params }: { params: { id: ObjectId } }){
  console.log(params);
  
  const [set, setSet] = useState<Set>();
  useEffect(() => {
    async function getSet() {
      const response = await fetch(`api/v1/set/{params.id}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { set } = await response.json();

      console.log(set);
      setSet(set);
    }
    getSet();
  }, []);

    return(
        <p> {JSON.stringify(set)}</p>
    )
}