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
    <nav className="navbar mx-auto bg-neutral">
      <div className="navbar-start m-2">
        <Link href="/" className=" text-xl normal-case ">
          Home
        </Link>
      </div>
      {session && (
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost navbar-center">
            Actions
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content rounded-box z-[1] w-52 bg-neutral p-2 shadow"
          >
            <li>
              <Link href={"/new-set"}>Create new Set</Link>
            </li>
            <li>
              <Link href={"/search-set"}>Search Sets library </Link>
            </li>
          </ul>
        </div>
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
