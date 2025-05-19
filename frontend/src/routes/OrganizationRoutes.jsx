import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "../components/ProtectedRoutes";
import NotFound from "../components/NotFound";
import AddUserScreen from "../Screens/OrganizationScreens/AddUser";
import OrganizationDashboard from "../Screens/OrganizationScreens/OrganizationDashboard";
import ManageUsers from "../Screens/OrganizationScreens/ManageUsers";
import SocketConnection from "../SocketConnection";

function AdminRoutes() {
  return (
    <>
      <SocketConnection />
      <Routes>
        <Route
          path=""
          element={<ProtectedRoutes allowedRoles={["organization"]} />}
        >
          <Route path="/" element={<OrganizationDashboard />} />
          <Route path="/organization/add-user" element={<AddUserScreen />} />
          <Route path="/organization/manage-users" element={<ManageUsers />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default AdminRoutes;
