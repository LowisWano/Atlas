import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/hooks/auth-hooks";
import { useEffect, useState } from "react";

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

  // If still loading, don't render anything
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or some other placeholder
  }

  // Once loading is complete, check user and render protected route or navigate to login
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
