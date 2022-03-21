import React from "react";
import { Routes, Route } from "react-router-dom";

// Import Helpers
import { UserRole, authenticated, HandleUnAuth } from "./helpers";

// Import Components to show Screens
import { Home } from "../main";
import { Login } from "../auth/logIn/index";

export const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<div className="">SignUp</div>} />

      {/* Handling the Business User Routes */}

      {UserRole === 2 && authenticated ? (
        <>
          <Route
            path="/business/dashboard"
            element={<div className="">Hello</div>}
          />
        </>
      ) : null}
      <Route path="*" element={<div> Login</div>} />
    </Routes>
  );
};
