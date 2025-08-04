"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    setError(false);

    // Simulate network request for better UX
    await new Promise((resolve) => setTimeout(resolve, 600));

    const res = await fetch("/api/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: password }), 
    });

    const data = await res.json();

    if (data.valid) {
      Cookies.set("admin-auth", "true", { expires: 1 }); // 1 day
      router.push("/admin/add");
    } else {
      setError(true);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      {/* Animated background glow effect */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-orange-600 opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Login container with card effect */}
      <motion.div
        className="relative z-10 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h1
          className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Admin Login
        </motion.h1>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                placeholder="Enter password"
                autoFocus
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <button
              onClick={handleLogin}
              disabled={isLoading || !password}
              className="w-full py-3 rounded-lg font-medium relative overflow-hidden group transition-all duration-300 ease-out"
            >
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out bg-gradient-to-r from-orange-600 to-red-600 group-hover:from-orange-500 group-hover:to-red-500"></span>
              <span className="relative flex items-center justify-center">
                {isLoading ? (
                  <motion.div
                    className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ) : (
                  "Login"
                )}
              </span>
            </button>
          </motion.div>
        </div>

        {/* Error message with animation */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="mt-4 text-center text-red-400 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              Incorrect password. Please try again.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Subtle floating particles effect */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-orange-500"
          style={{
            width: `${Math.floor(Math.random() * 4) + 2}px`,
            height: `${Math.floor(Math.random() * 4) + 2}px`,
            left: `${Math.floor(Math.random() * 100)}%`,
            top: `${Math.floor(Math.random() * 100)}%`,
            opacity: 0.3,
          }}
          animate={{
            y: [0, -Math.floor(Math.random() * 50) - 50],
            opacity: [0.3, 0],
          }}
          transition={{
            duration: Math.floor(Math.random() * 5) + 8,
            repeat: Infinity,
            ease: "easeOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}
