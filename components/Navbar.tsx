"use client";
import Link from "@/node_modules/next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const logoutHandler = () => {
    signOut();
  };

  return (
    <nav className="navbar  bg-base-100">
      <div className="navbar-start">
        <Link href="/" className=" text-xl normal-case">
          Home
        </Link>
      </div>
      {session && (
        <Link href={"/new-set"} className=" navbar-center">
          Create new Set
        </Link>
      )}
      <div className="navbar-end">
        {session ? (
          <button onClick={logoutHandler} className="btn btn-ghost">
            Logout
          </button>
        ) : (
          <Link href="/login" className="btn btn-ghost">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
