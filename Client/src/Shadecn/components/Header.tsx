import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { RootState } from "@/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { handleError } from "@/utils/handleError";
import { useLogoutMutation } from "@/Redux/slices/api";
import { updateCurrentUser, updateIsLoggedIn } from "@/Redux/slices/appSlice";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function Header() {
  const [Logout, { isLoading }] = useLogoutMutation();
  const Dispatch = useDispatch();

  const isLoggedIn = useSelector(
    (state: RootState) => state.appSlice.isLoggedIn
  );

  const currentUser = useSelector(
    (state:RootState) => state.appSlice.currentUser
  );

  async function handleLogout() {
    try {
      await Logout().unwrap();
      Dispatch(updateIsLoggedIn(false), Dispatch(updateCurrentUser({})));
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <nav className="w-full h-[60px] flex justify-between items-center text-white bg-gray-900 p-3 px-4">
      <Link to="/">
        <h2 className="font-bold text-2xl select-none">WebVerse</h2>
      </Link>
      <ul className="flex gap-2">
        {isLoggedIn ? (
          <>
            <li>
              <Button
                loading={isLoading}
                onClick={handleLogout}
                variant="destructive"
                className="text-base"
              >
                Logout
              </Button>
            </li>
            <li>
              <Avatar>
                <AvatarImage src={currentUser.picture} />
                <AvatarFallback className="capitalize font-semibold">
                  {currentUser.username?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </li>
          </>
        ) : (
          <>
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
          </>
        )}

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
