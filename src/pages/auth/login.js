// pages/auth/login.js

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for login
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Set loading to true when login starts

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false); // Set loading to false after response

    if (res.error) {
      setError(res.error); // Set error if login fails
    } else {
      // Redirect based on user role
      if (res?.user?.role === 'employer') {
        router.push("/employer/dashboard"); // Redirect employer to the dashboard
      } if (res?.user?.role === 'user') {
        router.push("/candidate/dashboard"); // Redirect employer to the dashboard
      }  
      else {
        router.push("/"); // Redirect to home page for users
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {/* Display error message if login fails */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        {/* Loading message */}
        {loading && <div className="text-center text-blue-600 mb-4">Logging you in...</div>}

        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
          Login
        </button>
      </form>
    </div>
  );
}
