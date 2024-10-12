import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/hooks/auth-hooks";
import { useEffect } from "react";

const ProtectedRoutes = () => {
  const { setUser, user } = useUserStore();
  useEffect(() => {
    const cachedUser = JSON.parse(localStorage.getItem("token"));

    if (cachedUser && !user) {
      setUser(cachedUser);
    }
  }, [])
  
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
