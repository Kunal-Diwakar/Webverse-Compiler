import { Route, Routes } from "react-router-dom";
import Header from "./Shadecn/components/Header";
import Home from "./Pages/Home";
import Compiler from "./Pages/Compiler";
import NotFound from "./Pages/NotFound";
import { ThemeProvider } from "./Shadecn/components/theme-provider";
import { Toaster } from "./Shadecn/components/ui/sonner";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
function App() {
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
