import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import api from "../services/api";

function GenerateInterview() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        role: "",
        difficulty: "Easy",
        totalQuestions: 5,
        topics: ""
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.role.trim()) {
            alert("Role is required");
            return;
        }
        if (!formData.topics.trim()) {
            alert("Topics are required");
            return;
        }
        try {
            setLoading(true);
            const res = await api.post(
                "/interviews/generate",
                formData
            );
            navigate(`/interview/${res.data.interviewId}`);
        } catch (err) {
            console.log(err);
            toast.error(
                err.response?.data?.message ||
                "Failed to create interview"
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
                    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
                        <h1 className="text-3xl font-bold mb-2">
                            🤖 Generate AI Interview
                        </h1>
                        <p className="text-gray-500 mb-8">
                            Generate a personalized interview using Google Gemini AI.
                        </p>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            <div>
                                <label className="block mb-2 font-medium">
                                    Role
                                </label>
                                <input
                                    type="text"
                                    name="role"
                                    placeholder="Frontend Developer"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">
                                    Difficulty
                                </label>
                                <select
                                    name="difficulty"
                                    value={formData.difficulty}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3"
                                >
                                    <option>Easy</option>
                                    <option>Medium</option>
                                    <option>Hard</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">
                                    Number of Questions
                                </label>
                                <input
                                    type="number"
                                    name="totalQuestions"
                                    min="1"
                                    max="10"
                                    value={formData.totalQuestions}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">
                                    Topics
                                </label>
                                <input
                                    type="text"
                                    name="topics"
                                    placeholder="React, JavaScript, HTML, CSS"
                                    value={formData.topics}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3"
                                />
                            </div>
                            {/* <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg disabled:bg-gray-400"
                            >
                                {
                                    loading
                                        ?
                                        "Generating Interview..."
                                        :
                                        "Generate Interview"
                                }
                            </button> */}
                            <button
                               disabled={loading}
                               className="bg-blue-600 w-full py-3 rounded-lg text-white"
                            >
                            {
                               loading ?
                               <div className="flex justify-center">
                               <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                               </div>
                               : "Generate Interview"}

                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default GenerateInterview;