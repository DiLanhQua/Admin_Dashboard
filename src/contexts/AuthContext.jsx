/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import ROLE from "../config/role";

// Tạo Context
const AuthContext = createContext();

// Provider để bọc ứng dụng của bạn
export const AuthProvider = ({ children }) => {
  const [islogin, setIslogin] = useState(false);
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    const role = Cookies.get("role");
    if (role !== undefined) {
      setUserRole(ROLE[role]);
      setIslogin(true);
    }
  }, []);

  const setRole = (role) => {
    Cookies.set("role", role, { expires: 7 });
    setUserRole(ROLE[role]);
  };

  const login = () => {
    setIslogin(true);
  };

  const logout = () => {
    setIslogin(false);
    Cookies.remove("role");
    setUserRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        islogin,
        userRole,
        setRole,
        login,
        logout,
        setUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để sử dụng AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
