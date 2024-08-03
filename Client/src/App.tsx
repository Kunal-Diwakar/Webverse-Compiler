import { useEffect } from "react";
import Header from "./Shadecn/components/Header";
import { ThemeProvider } from "./Shadecn/components/theme-provider";
import { Toaster } from "./Shadecn/components/ui/sonner";
import { useGetUserDetailsQuery } from "./Redux/slices/api";
import { useDispatch } from "react-redux";
import { updateCurrentUser, updateIsLoggedIn } from "./Redux/slices/appSlice";
import AllRoutes from "./AllRoutes";
function App() {
  const { data, error } = useGetUserDetailsQuery();
  const Diapatch = useDispatch();

  useEffect(() => {
    if (data) {
      Diapatch(updateCurrentUser(data));
      Diapatch(updateIsLoggedIn(true));
    } else if (error) {
      Diapatch(updateCurrentUser({}));
      Diapatch(updateIsLoggedIn(false));
    }
  }, [Diapatch, data, error]);

  return (
    <>
      <Toaster position="bottom-right" theme="dark" />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <AllRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
