import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const ProtectedRoutes = ({ allowedRoles }) => {
  const { mockzyUser } = useSelector((state) => state.auth);

  return mockzyUser && allowedRoles.includes(mockzyUser.role) ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoutes;
