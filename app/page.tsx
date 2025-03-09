"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LogIn, UserPlus, User, Mail, Lock } from "lucide-react";

import { toast } from "react-toastify";

import { login, getTokenValue } from "@/services/auth.services";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Gère la soumission du formulaire de connexion ou d'inscription.
   * Effectue l'authentification de l'utilisateur avec les informations fournies.
   * Affiche un message de succès ou d'erreur et redirige en cas de succès.
   *
   * @param {React.FormEvent} e - L'événement du formulaire.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(email, password);

    if (success) {
      toast.success("Welcome back!");

      setTimeout(() => {
        window.location.href = "/dashboard/home"; // Redirection après connexion réussie
      }, 1000);
    } else {
      toast.error("Invalid credentials");
      setIsLoading(false);
    }
  };

  /**
   * Vérifie si l'utilisateur est déjà authentifié au chargement du composant.
   * Si un token est trouvé, l'utilisateur est redirigé vers la page d'accueil.
   */
  useEffect(() => {
    let isMounted = true; // Empêche l'exécution si le composant est démonté

    const checkAuth = async () => {
      const token = await getTokenValue();

      if (token && isMounted) {
        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

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
          {!isLogin && (
            <div className="flex items-center bg-white p-2 rounded-lg">
              <User className="text-blue-300 mr-2" size={20} />
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                className="bg-transparent text-gray-500 w-full focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}
          <div className="flex items-center bg-white p-2 rounded-lg">
            <Mail className="text-blue-300 mr-2" size={20} />
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent text-gray-500 w-full focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center bg-white p-2 rounded-lg">
            <Lock className="text-blue-300 mr-2" size={20} />
            <input
              type="password"
              placeholder="Mot de passe"
              className="bg-transparent text-gray-500 w-full focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-300 text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-blue-400 transition flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="spinner-border animate-spin w-5 h-5 border-4 border-t-blue-500 border-gray-300 rounded-full"></div> // Spinner
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
