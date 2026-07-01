import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "student"
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await api.post(
                "/auth/register",
                formData
            );

            toast.success(res.data.message || "Register Successfull");

            navigate("/login");

        } catch (err) {

            console.log(err);

            toast.error(
                err.response?.data?.message ||
                "Failed to Register"
            );

        }
    };

   return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-blue-600">
            TalentForge AI
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome Back 👋
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
            <div>

            <label className="block text-gray-700 mb-2 font-medium">
              Name
            </label>

            <input
              type="name"
              name="name"
              placeholder="what`s your full name ?"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

          <div>

            <label className="block text-gray-700 mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="what`s your email ?"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

          <div>

            <label className="block text-gray-700 mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="what`s your password ?"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

          

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            SignUp
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline ml-2"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;