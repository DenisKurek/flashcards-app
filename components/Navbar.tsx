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
    <nav className="navbar navbar-dark bg-dark p-2">
      <Link href="/" className="navbar-brand">
        Home
      </Link>
      {session && (
        <Link href={"new-set"} className=" fs-4">
          Create new Set
        </Link>
      )}
      {session ? (
        <button onClick={logoutHandler} className=" link-dark">
          Logout
        </button>
      ) : (
        <Link href="login" className="navbar-text">
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
