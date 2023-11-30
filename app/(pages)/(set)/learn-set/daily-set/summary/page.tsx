"use client";
import SummaryTable from "@/components/learn-set/SummaryTable";
import Link from "next/link";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="container card bg-neutral text-center">
      <div className="overflow-x-auto ">
        <SummaryTable />
      </div>
      <div className="m-4 flex grow justify-center">
        <Link
          href={"/learn-set/daily-set"}
          className="btn-shadow btn btn-primary"
        >
          Next Round
        </Link>
      </div>
    </div>
  );
}
