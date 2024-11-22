import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/hooks/auth-hooks";
import { useEffect, useState } from "react";
import LoadingSpinner from "../custom-ui/loading-spinner";
import { storeToken } from "@/hooks/auth-hooks";

const ProtectedRoutes = () => {
  const { setUser, user } = useUserStore();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (loading) {
      const cachedToken = localStorage.getItem("token");

      if (!cachedToken) {
        setLoading(false);
        setIsAuthenticated(false);
        return;
      }else{
        const cachedUser = JSON.parse(cachedToken);
        setUser(cachedUser);
        setLoading(false);
        setIsAuthenticated(true);
      }
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
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
