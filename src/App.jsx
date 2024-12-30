import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/SiteBar";
import useAuth from "./hooks/Auth";
import Service from "./components/Service";
import { Box } from "@mui/material";
import ServiceDetails from "./components/ServiceDetails";

export default function App() {
  useAuth();
  const { pathname } = useLocation();

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {pathname !== "/login" && <Navbar />}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: "100%",
          ml: pathname !== "/login" ? { sm: "70px" } : 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<Service />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
        </Routes>
      </Box>
    </Box>
  );
}
