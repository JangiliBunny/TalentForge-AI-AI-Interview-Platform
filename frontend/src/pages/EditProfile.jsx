import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import api from "../services/api";

function EditProfile() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: ""
    });
    const fetchProfile = async () => {
        try {
            const res = await api.get("/auth/me");
            setFormData({
                name: res.data.user.name,
                email: res.data.user.email,
                role: res.data.user.role
            });
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchProfile();
    }, []);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await api.put("/auth/profile", {
                name: formData.name
            });
            alert("Profile Updated Successfully");
            navigate("/profile");
        } catch (err) {
            console.log(err);
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
                            Edit Profile
                        </h1>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            <div>
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3 mt-2"
                                />
                            </div>
                            <div>
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    disabled
                                    className="w-full border rounded-lg p-3 mt-2 bg-gray-100"
                                />
                            </div>
                            <div>
                                <label>Role</label>
                                <input
                                    type="text"
                                    value={formData.role}
                                    disabled
                                    className="w-full border rounded-lg p-3 mt-2 bg-gray-100"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                            >
                                {loading
                                    ? "Saving..."
                                    : "Save Changes"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;