import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { RootState } from "@/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { handleError } from "@/utils/handleError";
import { useLogoutMutation } from "@/Redux/slices/api";
import {
  setCurrentWidth,
  updateCurrentUser,
  updateIsLoggedIn,
} from "@/Redux/slices/appSlice";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { updateIsOwner } from "@/Redux/slices/CompilerSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

function Header() {
  const [Logout, { isLoading }] = useLogoutMutation();
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const Dispatch = useDispatch();

  const windowWidth = useSelector(
    (state: RootState) => state.appSlice.currentWidth
  );

  const isLoggedIn = useSelector(
    (state: RootState) => state.appSlice.isLoggedIn
  );

  const currentUser = useSelector(
    (state: RootState) => state.appSlice.currentUser
  );

  const handleResize = () => {
    Dispatch(setCurrentWidth(window.innerWidth));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  async function handleLogout() {
    try {
      await Logout().unwrap();
      Dispatch(updateIsLoggedIn(false));
      Dispatch(updateCurrentUser({}));
      Dispatch(updateIsOwner(false));
    } catch (error) {
      handleError(error);
    }
  }

  const closeSheet = () => {
    setSheetOpen(false);
  };

  return (
    <nav className="w-full h-[60px] flex justify-between items-center text-white bg-gray-900 p-3 px-4">
      <Link to="/">
        <h2 className="font-bold text-2xl select-none">WebVerse</h2>
      </Link>
      {windowWidth > 600 ? (
        <ul className="flex gap-2">
          <li>
            <Link to="/compiler">
              <Button variant="secondary" className="text-base">
                Compiler
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/all-codes">
              <Button variant="secondary" className="text-base">
                All Codes
              </Button>
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/my-codes">
                  <Button variant="success" className="text-base">
                    My Codes
                  </Button>
                </Link>
              </li>
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
                  <AvatarFallback className="capitalize">
                    {currentUser.username?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <Button variant="simple" className="text-base">
                    Login
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <Button variant="simple" className="text-base">
                    Signup
                  </Button>
                </Link>
              </li>
            </>
          )}
        </ul>
      ) : (
        <div className="flex gap-2 justify-center items-center">
          <Avatar>
            <AvatarImage src={currentUser.picture} />
            <AvatarFallback className="capitalize">
              {currentUser.username?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button>
                <GiHamburgerMenu />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full">
              <ul className="flex flex-col gap-2 mt-10">
                <li>
                  <Link to="/compiler">
                    <Button
                      onClick={closeSheet}
                      className="w-full text-base"
                      variant="secondary"
                    >
                      Compiler
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to="/all-codes">
                    <Button
                      onClick={closeSheet}
                      className="w-full text-base"
                      variant="secondary"
                    >
                      All Codes
                    </Button>
                  </Link>
                </li>
                {isLoggedIn ? (
                  <>
                    <li>
                      <Link to="/my-codes">
                        <Button
                          onClick={closeSheet}
                          className="w-full text-base"
                          variant="simple"
                        >
                          My Codes
                        </Button>
                      </Link>
                    </li>
                    <li>
                      <Button
                        loading={isLoading}
                        onClick={async () => {
                          await handleLogout();
                          closeSheet();
                        }}
                        variant="destructive"
                        className="w-full"
                      >
                        Logout
                      </Button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login">
                        <Button
                          onClick={closeSheet}
                          className="w-full text-base"
                          variant="simple"
                        >
                          Login
                        </Button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/signup">
                        <Button
                          onClick={closeSheet}
                          className="w-full text-base"
                          variant="simple"
                        >
                          Signup
                        </Button>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </nav>
  );
}

export default Header;
