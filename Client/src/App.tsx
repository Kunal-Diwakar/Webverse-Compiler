import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Shadecn/components/Header";
import Home from "./Pages/Home";
import Compiler from "./Pages/Compiler";
import NotFound from "./Pages/NotFound";
import { ThemeProvider } from "./Shadecn/components/theme-provider";
import { Toaster } from "./Shadecn/components/ui/sonner";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { useGetUserDetailsQuery } from "./Redux/slices/api";
import { useDispatch } from "react-redux";
import { updateCurrentUser, updateIsLoggedIn } from "./Redux/slices/appSlice";
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compiler" element={<Compiler />} />
          <Route path="/compiler/:urlId?" element={<Compiler />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
