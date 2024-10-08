import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  // disable protected route 
	// const localStorageToken = true;

  // comment this line if you want to temporarily disable protected routes
	const localStorageToken = localStorage.getItem("token");

	return localStorageToken ? <Outlet /> : <Navigate to="/login"  replace />;
};

export default ProtectedRoutes;