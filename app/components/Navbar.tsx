import { Link } from "next-view-transitions";

const Navbar = () => {
  return (
    <nav>
      <ul className="space-x-5 p-10 flex items-center justify-between uppercase text-sm">
        {/* Simply use the Link component */}
        <Link href="/">Ratul</Link>
        <div className="space-x-5">
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
