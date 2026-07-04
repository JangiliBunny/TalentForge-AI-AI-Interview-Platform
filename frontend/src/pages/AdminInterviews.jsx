import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import api from "../services/api";
import toast from "react-hot-toast";

function AdminInterviews() {

    const [interviews, setInterviews] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchInterviews = async () => {

        try {

            const res = await api.get("/admin/interviews");

            setInterviews(res.data.interviews);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchInterviews();

    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this interview?"
        );
        if (!confirmDelete) return;
        try {
            await api.delete(`/admin/interviews/${id}`);
            fetchInterviews();
        } catch (err) {
            console.log(err);
            toast.error("Failed to delete interview.");
        }
    };
    if (loading) {
        return (
            <h1 className="text-center mt-10 text-3xl">
                Loading...
            </h1>
        );
    }
    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">
                            Manage Interviews
                        </h1>
                        <p className="text-gray-500 mt-2">
                            View and manage all interviews.
                        </p>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left">
                                        Title
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        Candidate
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        Difficulty
                                    </th>
                                    <th className="px-6 py-4 text-center">
                                        Questions
                                    </th>
                                    <th className="px-6 py-4 text-center">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    interviews.length === 0 ?
                                    (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="text-center py-8 text-gray-500"
                                            >
                                                No Interviews Found
                                            </td>
                                        </tr>
                                    )
                                    :
                                    (
                                        interviews.map((interview) => (
                                            <tr
                                                key={interview._id}
                                               className="border-b hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4">
                                                    {interview.title}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {interview.user?.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                                                        {interview.difficulty}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {interview.questions.length}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {
                                                        interview.status === "completed"
                                                        ?
                                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                                            Completed
                                                        </span>
                                                        :
                                                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                                                            Pending
                                                        </span>
                                                    }
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={() => handleDelete(interview._id)}
                                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AdminInterviews;