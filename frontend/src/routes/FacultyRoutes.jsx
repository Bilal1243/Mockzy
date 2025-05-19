import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "../components/ProtectedRoutes";
import FacultyHomeScreen from "../Screens/FacultyScreens/FacultyHomeScreen";
import NotFound from "../components/NotFound";
import SocketConnection from "../SocketConnection";

function FacultyRoutes() {
  return (
    <>
    <SocketConnection/>
      <Routes>
        <Route path="" element={<ProtectedRoutes allowedRoles={["faculty"]} />}>
          <Route path="/" element={<FacultyHomeScreen />} />


          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default FacultyRoutes;
