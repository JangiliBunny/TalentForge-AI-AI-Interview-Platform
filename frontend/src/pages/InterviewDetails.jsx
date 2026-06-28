import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import api from "../services/api";

function InterviewDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [interview, setInterview] = useState(null);

    const fetchInterview = async () => {

        try {

            const res = await api.get(`/interviews/${id}`);

            setInterview(res.data.interview);

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        fetchInterview();

    }, []);

    if (!interview) {

        return (
            <div className="text-center mt-20 text-xl">
                Loading...
            </div>
        );

    }

    return (

        <div className="bg-gray-100 min-h-screen">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <div className="flex-1 p-8">

                    <div className="bg-white rounded-xl shadow-lg p-8">

                        <h1 className="text-3xl font-bold mb-6">

                            {interview.title}

                        </h1>

                        <div className="grid grid-cols-2 gap-6 mb-8">

                            <div>

                                <p className="text-gray-500">
                                    Role
                                </p>

                                <h3 className="font-semibold text-lg">
                                    {interview.role}
                                </h3>

                            </div>

                            <div>

                                <p className="text-gray-500">
                                    Difficulty
                                </p>

                                <h3 className="font-semibold text-lg">
                                    {interview.difficulty}
                                </h3>

                            </div>

                            <div>

                                <p className="text-gray-500">
                                    Status
                                </p>

                                <h3 className="font-semibold text-lg capitalize">
                                    {interview.status}
                                </h3>

                            </div>

                            <div>

                                <p className="text-gray-500">
                                    Total Questions
                                </p>

                                <h3 className="font-semibold text-lg">
                                    {interview.questions.length}
                                </h3>

                            </div>

                        </div>

                        <h2 className="text-2xl font-bold mb-4">

                            Questions

                        </h2>

                        <div className="space-y-4">

                            {interview.questions.map((question, index) => (

                                <div
                                    key={question._id}
                                    className="border rounded-lg p-4 bg-gray-50"
                                >

                                    <h3 className="font-semibold">

                                        {index + 1}. {question.title}

                                    </h3>

                                    <p className="text-gray-600 mt-1">

                                        Topic : {question.topic}

                                    </p>

                                    <span className="inline-block mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                                        {question.difficulty}

                                    </span>

                                </div>

                            ))}

                        </div>

                        <div className="mt-8">

                            {interview.status === "pending" ? (

                                <button
                                    onClick={() =>
                                        navigate(`/interview/${interview._id}`)
                                    }
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                                >
                                    Start Interview
                                </button>

                            ) : (

                                <button
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
                                >
                                    View Report
                                </button>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default InterviewDetails;