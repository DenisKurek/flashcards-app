import Link from "@/node_modules/next/link";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark p-2">
      <Link href="/" className="navbar-brand">
        Home
      </Link>
      <Link href="login" className="navbar-text">
        Login
      </Link>
    </nav>
  );
};

export default Navbar;
