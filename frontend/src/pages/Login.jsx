import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import '../App.css';

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
              alert(res.data.message);
              navigate("/dashboard");
         }catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Registration Failed"
            );

        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
              <h1>TalentForge</h1>

                <h2>Create Account</h2>
                 
                 <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="What's your e-mail?"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Your password?"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Login
                    </button>
                 </form>
                 <p>

                    Don't have an account?


                    <Link to="/register">
                        Sign up
                    </Link>

                </p>
            </div>

        </div>
    )
}

export default Login;