"use client";

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import axios, { endpoints } from "@/lib/axios";

import { useAuth } from "@/auth/hooks/use-auth";

// -------------------------------------------------------------

export function useAuthActions() {
  const router = useRouter();
  const { login: _login, logout: _logout } = useAuth();

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await axios.post(endpoints.auth.login, credentials);
      const { token } = response.data;

      setCookie("auth_token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const userResponse = await axios.get("/user");

      _login(userResponse.data);

      router.push("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  };

  const signup = async (data: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      await axios.post(endpoints.auth.signup, data);

      router.push("/login");
    } catch (error) {
      console.error("Signup Error:", error);
      throw error;
    }
  };

  const logout = async () => {
    await _logout();
    router.replace("/");
  };

  return { login, signup, logout };
}
