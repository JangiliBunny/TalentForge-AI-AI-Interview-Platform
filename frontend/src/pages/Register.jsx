import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import '../App.css';

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

            alert(res.data.message);

            navigate("/login");

        } catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Registration Failed"
            );

        }
    };

    return (
        <div className="register-container">

            <div className="register-card">

                <h1>TalentForge</h1>

                <h2>Create Account</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="What's your Full Name?"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="What`s Your Email"
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

                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >

                        <option value="student">
                            Student
                        </option>

                        <option value="admin">
                            Admin
                        </option>

                    </select>

                    <button type="submit">
                        Register
                    </button>

                </form>

                <p>

                    Already have an account?

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Register;