import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/hooks/auth-hooks";
import { useEffect, useState } from "react";
import LoadingSpinner from "../custom-ui/loading-spinner";
import { storeToken } from "@/hooks/auth-hooks";

const ProtectedRoutes = () => {
  const { setUser, user } = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      const cachedUser = JSON.parse(localStorage.getItem("token"));
      storeToken(cachedUser)
      setUser(cachedUser);
      setLoading(false);
    }
  }, [loading, setUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-20">
        <LoadingSpinner />
      </div> 
    );
  }

  // Once loading is complete, check user and render protected route or navigate to login
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
