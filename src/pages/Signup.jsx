import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingOverlay from "./loading"; 

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({name: "",email: "",phone: "",password: "",organizationName: "",registrationNumber: "",role: "donor"});
  const [loading, setLoading] = useState(false); // ✅ loader state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {

    e.preventDefault();
    setLoading(true); // ✅ show loader

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_url}/api/users/register`, formData);
      //console.log("response", response);

      if (response.data.status === "success") {
        alert("✅ Signup successful!");
        navigate("/login");

      } else {
        alert("❌ " + response.data.message);
      }

    } catch (error) {
      console.error("Signup Error:", error);
      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "❌ Something went wrong during signup.";
      alert(backendMessage);
      
    } finally {
      setLoading(false); // ✅ hide loader
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FAEBD7] p-4 relative">
      {loading && <LoadingOverlay message="Signing you up..." />} {/* ✅ loader */}

      <div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-5xl mt-[5%]">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Sign Up</h2>

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Sign Up As</label>
            <select
              className="w-full p-3 border rounded-lg"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="donor">Donor</option>
              <option value="ngo">NGO</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                className="w-full p-3 border rounded-lg"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-3 border rounded-lg"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              className="w-full p-3 border rounded-lg"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {formData.role === "ngo" && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Organization Name</label>
                <input
                  type="text"
                  name="organizationName"
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter your organization name"
                  value={formData.organizationName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Registration Number</label>
                <input
                  type="text"
                  name="registrationNumber"
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter your registration number"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-3 border rounded-lg"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white w-full py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-700 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
}
