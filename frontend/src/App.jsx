import { Route, Routes } from "react-router-dom";
import HomePage from "./Screens/HomePage";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import { useSelector } from "react-redux";
import StudentRoutes from "./routes/StudentRoutes";
import FacultyRoutes from "./routes/FacultyRoutes";
import AdminRoutes from "./routes/OrganizationRoutes";
import NotFound from "./components/NotFound";
import { useEffect } from "react";
import SocketConnection from "./SocketConnection";

function App() {
  const { mockzyUser } = useSelector((state) => state.auth);

  if (mockzyUser && mockzyUser.role === "student") return <StudentRoutes />;
  if (mockzyUser && mockzyUser.role === "faculty") return <FacultyRoutes />;
  if (mockzyUser && mockzyUser.role === "organization") return <AdminRoutes />;

  return (
    <>
      <SocketConnection />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
