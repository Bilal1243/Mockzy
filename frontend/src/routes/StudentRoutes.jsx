import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "../components/ProtectedRoutes";
import StudentHomeScreen from "../Screens/StudentScreens/StudentHomeScreen";
import NotFound from "../components/NotFound";
import SocketConnection from "../SocketConnection";

function StudentRoutes() {
  return (
    <>
    <SocketConnection/>
      <Routes>
        <Route path="" element={<ProtectedRoutes allowedRoles={["student"]} />}>
          <Route path="/" element={<StudentHomeScreen />} />



          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default StudentRoutes;
