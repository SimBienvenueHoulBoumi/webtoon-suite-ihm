"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, UserPlus, User, Mail, Lock } from "lucide-react";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen text-white p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md text-center"
      >
        <h2 className="text-2xl font-bold text-blue-400">
          {isLogin ? "Login" : "Register"}
        </h2>

        <motion.form
          key={isLogin ? "login" : "register"}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="mt-6 flex flex-col gap-4 text-sm"
        >
          {!isLogin && (
            <div className="flex items-center bg-gray-700 p-3 rounded-lg">
              <User className="text-blue-300 mr-2" size={20} />
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                className="bg-transparent text-white w-full focus:outline-none"
              />
            </div>
          )}
          <div className="flex items-center bg-gray-700 p-3 rounded-lg">
            <Mail className="text-blue-300 mr-2" size={20} />
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent text-white w-full focus:outline-none"
            />
          </div>
          <div className="flex items-center bg-gray-700 p-3 rounded-lg">
            <Lock className="text-blue-300 mr-2" size={20} />
            <input
              type="password"
              placeholder="Mot de passe"
              className="bg-transparent text-white w-full focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-300 text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-blue-400 transition flex items-center justify-center gap-2"
          >
            {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </motion.form>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-blue-300 hover:underline text-sm"
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </button>
      </motion.div>
    </div>
  );
}
