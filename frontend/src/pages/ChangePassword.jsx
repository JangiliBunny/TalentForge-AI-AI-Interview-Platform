import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import api from "../services/api";

function ChangePassword() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            setLoading(true);
            await api.put(
                "/auth/change-password",
                {
                    oldPassword: formData.oldPassword,
                    newPassword: formData.newPassword
                }
            );
            alert("Password Changed Successfully");
            navigate("/profile");
        } catch (err) {
            console.log(err);
            alert(
                err.response?.data?.message ||
                "Failed to change password."
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-8">
                    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
                        <h1 className="text-3xl font-bold mb-8">
                            Change Password
                        </h1>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            <div>
                                <label>
                                    Old Password
                                </label>
                                <input
                                    type="password"
                                    name="oldPassword"
                                    value={formData.oldPassword}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3 mt-2"
                                />
                            </div>
                            <div>
                                <label>
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3 mt-2"
                                />
                            </div>
                            <div>
                                <label>
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3 mt-2"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                            >
                                {loading
                                    ? "Updating..."
                                    : "Change Password"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;