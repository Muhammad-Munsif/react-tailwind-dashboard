// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        try {
          // Verify token with backend (in real app)
          // const response = await api.get('/auth/verify', {
          //   headers: { Authorization: `Bearer ${storedToken}` }
          // });

          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        } catch (error) {
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      // In real app, make API call
      // const response = await api.post('/auth/login', { email, password });

      // Mock API response
      const mockUser = {
        id: 1,
        email,
        name: email.split("@")[0],
        role: email.includes("admin")
          ? "admin"
          : email.includes("manager")
          ? "manager"
          : email.includes("support")
          ? "support"
          : "employee",
        avatar: `https://ui-avatars.com/api/?name=${
          email.split("@")[0]
        }&background=random`,
      };

      const mockToken = "mock-jwt-token-12345";

      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem("token", mockToken);
      localStorage.setItem("user", JSON.stringify(mockUser));

      return { success: true, user: mockUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // Mock API call
      const mockUser = {
        id: Date.now(),
        ...userData,
        avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=random`,
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));

      return { success: true, user: mockUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const updateProfile = async (profileData) => {
    try {
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const hasPermission = (permission) => {
    if (!user) return false;

    const rolePermissions = {
      admin: ["all"],
      manager: [
        "view_dashboard",
        "manage_assets",
        "issue_assets",
        "view_reports",
        "manage_employees",
      ],
      support: ["view_dashboard", "manage_assets", "maintenance_access"],
      employee: ["view_assigned_assets", "request_assets"],
    };

    return (
      rolePermissions[user.role]?.includes("all") ||
      rolePermissions[user.role]?.includes(permission)
    );
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile,
    hasPermission,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
