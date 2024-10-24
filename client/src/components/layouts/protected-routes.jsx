import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/hooks/auth-hooks";
import { useEffect, useState } from "react";
import { LoaderCircle } from 'lucide-react';

const ProtectedRoutes = () => {
  const { setUser, user } = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedUser = JSON.parse(localStorage.getItem("token"));

    if (cachedUser) {
      setUser(cachedUser);
    }

    // Once the check is complete, stop loading
    setLoading(false);
  }, [setUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-20">
        <LoaderCircle />
      </div> 
    );
  }

  // Once loading is complete, check user and render protected route or navigate to login
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
