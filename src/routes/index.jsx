import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts";
import AdminRoute from "./AdminRoute";
import ErrorRoute from "./ErrorRoute";

import SignIn from "../pages/auth/login";
import ResetPassword from "../pages/auth/ResetPassword";

export default function RootRouter() {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminLayout />}>
        {AdminRoute()}
      </Route>

      {ErrorRoute()}

      {/* auth */}
      <Route path="/" element={<SignIn />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
}
