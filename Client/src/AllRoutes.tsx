import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./Shadecn/components/Loader/Loader";

const Home = lazy(() => import("./Pages/Home"));
const Compiler = lazy(() => import("./Pages/Compiler"));
const Login = lazy(() => import("./Pages/Login"));
const Signup = lazy(() => import("./Pages/Signup"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const AllCodes = lazy(() => import("./Pages/AllCodes"));
const MyCodes = lazy(() => import("./Pages/MyCodes"));

export default function AllRoutes() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[calc(100dvh-60px)] flex justify-center items-center">
          <Loader />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compiler/:urlId?" element={<Compiler />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/all-codes" element={<AllCodes />} />
        <Route path="/my-codes" element={<MyCodes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
