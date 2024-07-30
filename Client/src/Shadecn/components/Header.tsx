import { Link } from "react-router-dom";
import { Button } from "./ui/button";

function Header() {
  return (
    <nav className="w-full h-[60px] flex justify-between items-center text-white bg-gray-900 p-3 px-4">
      <Link to="/">
        <h2 className="font-bold text-2xl select-none">WebVerse</h2>
      </Link>
      <ul className="flex gap-2">
        <Link to="/login">
          <Button variant={"simple"} className="text-base">
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button variant={"simple"} className="text-base">
            Signup
          </Button>
        </Link>
        <Link to="/compiler">
          <h2 className="font-medium text-lg bg-gray-700 rounded-md px-3 py-1 select-none">
            Compiler
          </h2>
        </Link>
      </ul>
    </nav>
  );
}

export default Header;
