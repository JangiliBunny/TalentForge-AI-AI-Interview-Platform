import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function Login(){
    const navigate=useNavigate();

    const [formData, setFormData]=useState({
       email:"",
       password:""
    });

    const handleChange=(e)=>{
      setFormData({
        ...formData,
        [e.target.name]:e.target.value,
      });
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
         try{
              const res=await api.post(
                "/auth/login",
                formData,
              );
             toast.success(res.data.message || "Login Successfull");
              localStorage.setItem("token", res.data.token);
              localStorage.setItem(
                  "user",
                  JSON.stringify(res.data.user)
               );
              navigate("/dashboard");
         }catch (err) {

            console.log(err);

            toast.error(
                err.response?.data?.message ||
                "Login Failed"
            );

        }
    }
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
            Login
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline ml-2"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;