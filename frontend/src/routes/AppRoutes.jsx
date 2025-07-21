import { Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import GiveKudos from "../pages/GiveKudos";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/give"
        element={
          <PrivateRoute>
            <GiveKudos />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
