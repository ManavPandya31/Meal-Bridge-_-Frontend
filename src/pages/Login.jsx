import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingOverlay from "./loading";
import { Link } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");
  const [role, setRole] = useState("Donor");
  const [loading, setLoading] = useState(false); // NEW

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader

    try {
      const data = {
        email: email,
        password: password,
        role: role.toLowerCase()
      };

      const response = await axios.post(`${import.meta.env.VITE_API_url}/api/users/login`, data);

      if (response.data.status == "success") {
        alert("✅ Login Successful");
        const user = response.data.user;
        localStorage.setItem("User", JSON.stringify(user));
        navigate("/");
      } else {
        alert("❌ Login Failed: " + (response.data.message));
      }
    } catch (error) {
      console.error("Login Error:", error);
      const backendMessage =
        error.response?.data?.message || error.response?.data?.error || "❌ Something went wrong";

      if (backendMessage.includes("not approved")) {
        alert("⚠️ Your NGO account is pending admin approval. Please wait.");
      } else {
        alert("❌ " + backendMessage);
      }
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FAEBD7]">
      {loading && <LoadingOverlay message="Logging in..." />}
      <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 md:w-3/5 lg:w-2/5">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Login</h2>
        {error && <p className="text-red-600 text-center mb-2">{error}</p>}
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            >
              <option value="donor">Doner</option>
              <option value="ngo">NGO</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            onClick={handleLogin}
            className="bg-orange-500 text-white w-full py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-700 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
        </p>

      </div>
    </div>
  );
}
