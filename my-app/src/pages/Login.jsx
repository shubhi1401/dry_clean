import { useState } from "react";
import axios from "axios";

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/login", {
        username,
        password
      });

      if (res.data.message === "Login successful") {
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
      }
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 text-white">
      
      {/* Card */}
      <div className="bg-slate-800/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-80 hover:scale-[1.02] transition">

        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-400">
          DryClean Login
        </h2>

        {/* Username */}
        <input
          className="w-full mb-4 p-2 rounded bg-slate-700 border border-slate-600 
          focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          className="w-full mb-4 p-2 rounded bg-slate-700 border border-slate-600 
          focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 
          hover:from-indigo-600 hover:to-purple-700 transition p-2 rounded font-semibold shadow-md"
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;