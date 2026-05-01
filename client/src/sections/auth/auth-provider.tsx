"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "@/lib/axios";
import { getCookie, deleteCookie } from "cookies-next";

// -----------------------------------------------------------------------

interface User {
  name: string;
  email: string;
  mobile_no: string;
  address: string;
  is_registered_seller: boolean;
  pincode: string;
}

interface AuthContextType {
  user: User | null;
  login: (data: User) => void;
  logout: () => void;
  isLoading: boolean;
}

// -----------------------------------------------------------------------

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: (data: any) => {},
  logout: () => {},
  isLoading: true,
});

// -----------------------------------------------------------------------

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = getCookie("auth_token");
      if (token) {
        try {
          // Set default header for axios so future requests are authenticated
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const res = await axios.get("/user");

          console.log(res);

          setUser({
            name: res.data.name,
            email: res.data.email,
            mobile_no: res.data.mobile_no,
            address: res.data.address,
            is_registered_seller: res.data.is_registered_seller,
            pincode: res.data.pincode,
          });
        } catch (err) {
          deleteCookie("auth_token");
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = (userData: any) => setUser(userData);

  const logout = () => {
    deleteCookie("auth_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// -----------------------------------------------------------------------

export const useAuth = () => useContext(AuthContext);
