"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { LogIn, UserPlus, User, Mail, Lock, Loader } from "lucide-react";
import { toast } from "react-toastify";

import { login, register, getTokenValue } from "@/services/auth.services";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Gère la soumission du formulaire de connexion ou d'inscription.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let success;
      if (isLogin) {
        success = await login(email, password);
      } else {
        success = await register(email, password);
      }

      if (success) {
        toast.success(isLogin ? "Welcome back!" : "Account created!");
        setTimeout(() => {
          window.location.href = "/dashboard/home";
          setIsLoading(false);
        }, 5000);
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  /**
   * Vérifie si l'utilisateur est déjà authentifié.
   */
  const checkAuth = useCallback(async () => {
    const token = await getTokenValue();
    if (token && window.location.pathname !== "/") {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="flex items-center justify-center min-h-screen text-gray-500 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-indigo-100 shadow-lg rounded-2xl p-8 w-full max-w-md text-center"
      >
        <h2 className="text-2xl font-bold text-blue-500">
          {isLogin ? "Login" : "Register"}
        </h2>

        <motion.form
          key={isLogin ? "login" : "register"}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="mt-6 flex flex-col gap-4 text-sm"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center bg-white p-2 rounded-lg">
            <Mail className="text-blue-300 mr-2" size={20} />
            <input
              type="email"
              placeholder="Email"
              aria-label="Email"
              className="bg-transparent text-gray-500 w-full focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center bg-white p-2 rounded-lg">
            <Lock className="text-blue-300 mr-2" size={20} />
            <input
              type="password"
              placeholder="Mot de passe"
              aria-label="Mot de passe"
              className="bg-transparent text-gray-500 w-full focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-300 text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-blue-400 transition flex items-center justify-center gap-2 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader size={20} className="animate-spin" />
            ) : isLogin ? (
              <>
                <LogIn size={20} />
                Sign In
              </>
            ) : (
              <>
                <UserPlus size={20} />
                Sign Up
              </>
            )}
          </button>
        </motion.form>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-blue-400 hover:underline text-sm"
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </button>
      </motion.div>
    </div>
  );
}
