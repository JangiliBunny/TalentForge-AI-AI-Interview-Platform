import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import api from "../services/api";

function AdminUsers() {
    const [questions, setQuestions] = useState([]);
const fetchQuestions = async () => {
    try {
        const res = await api.get("/admin/questions");
        setQuestions(res.data.questions);
    } catch (err) {
        console.log(err);
    }
};
useEffect(() => {
    fetchQuestions();
}, []);

const deleteQuestion = async (id) => {
    if (!window.confirm("Delete this question?")) return;
    try {
        await api.delete(`/admin/questions/${id}`);
        fetchQuestions();
    } catch (err) {
        console.log(err);
    }
};
    return (
        <div className="bg-gray-100 min-h-screen">

    <Navbar />

    <div className="flex">

        <Sidebar />

        <div className="flex-1 p-8">

            <h1 className="text-3xl font-bold mb-8">

                Manage Questions

            </h1>

            <table className="w-full bg-white shadow rounded-xl">

                <thead>

                    <tr className="bg-blue-600 text-white">

                        <th className="p-4">Title</th>

                        <th>Topic</th>

                        <th>Difficulty</th>

                        <th>Created By</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        questions.map((question) => (

                            <tr
                                key={question._id}
                                className="border-b hover:bg-gray-50"
                            >

                                <td className="p-4">

                                    {question.title}

                                </td>

                                <td>

                                    {question.topic}

                                </td>

                                <td>

                                    <span
                                        className={`px-3 py-1 rounded-full text-white
                                        ${
                                            question.difficulty === "Easy"
                                                ? "bg-green-500"
                                                : question.difficulty === "Medium"
                                                ? "bg-yellow-500"
                                                : "bg-red-500"
                                        }`}
                                    >

                                        {question.difficulty}

                                    </span>

                                </td>

                                <td>

                                    {question.createdBy?.name || "Admin"}

                                </td>

                                <td className="space-x-2">

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/admin/questions/edit/${question._id}`
                                            )
                                        }
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                    >

                                        Edit

                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteQuestion(question._id)
                                        }
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                    >

                                        Delete

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    </div>

</div>
    );
}

export default AdminUsers;