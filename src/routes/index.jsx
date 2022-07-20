import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard";

import LoginPage from "../pages/login";

const Routers = () => {
  return (
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};
export default Routers;
