import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import api from "../services/api";

function Report() {

    const { id } = useParams();

    const [report, setReport] = useState(null);

    const fetchReport = async () => {

        try {

            const res = await api.get(
                `/interviews/${id}/report`
            );

            setReport(res.data.report);

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        fetchReport();

    }, []);

    if (!report) {

        return (
            <h1 className="text-center mt-10 text-3xl">

                Loading Report...

            </h1>
        );

    }

    return (

        <div className="bg-gray-100 min-h-screen">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <div className="flex-1 p-8">

                    <h1 className="text-4xl font-bold mb-8">

                        Interview Report

                    </h1>

                    {/* Summary */}

                    <div className="grid md:grid-cols-4 gap-6 mb-8">

                        <div className="bg-white rounded-xl shadow p-6">

                            <h2 className="text-gray-500">

                                Average Score

                            </h2>

                            <p className="text-3xl font-bold">

                                {report.averageScore}/10

                            </p>

                        </div>

                        <div className="bg-white rounded-xl shadow p-6">

                            <h2 className="text-gray-500">

                                Questions

                            </h2>

                            <p className="text-3xl font-bold">

                                {report.totalQuestions}

                            </p>

                        </div>

                        <div className="bg-white rounded-xl shadow p-6">

                            <h2 className="text-gray-500">

                                Role

                            </h2>

                            <p className="font-semibold">

                                {report.role}

                            </p>

                        </div>

                        <div className="bg-white rounded-xl shadow p-6">

                            <h2 className="text-gray-500">

                                Difficulty

                            </h2>

                            <p className="font-semibold">

                                {report.difficulty}

                            </p>

                        </div>

                    </div>

                    {/* Overall Feedback */}

                    <div className="bg-white rounded-xl shadow p-6 mb-8">

                        <h2 className="text-2xl font-bold">

                            Overall Feedback

                        </h2>

                        <p className="mt-3 text-gray-700">

                            {report.overallFeedback}

                        </p>

                    </div>

                    {/* Answers */}

                    <div className="space-y-6">

                        {

                            report.answers.map((answer, index) => (

                                <div
                                    key={answer._id}
                                    className="bg-white rounded-xl shadow p-6"
                                >

                                    <h2 className="text-xl font-bold">

                                        Question {index + 1}

                                    </h2>

                                    <p className="font-semibold mt-3">

                                        {answer.question.title}

                                    </p>

                                    <p className="mt-4">

                                        <strong>Your Answer:</strong>

                                    </p>

                                    <div className="bg-gray-100 rounded-lg p-4 mt-2">

                                        {answer.answerText}

                                    </div>

                                    <div className="flex justify-between mt-6">

                                        <div>

                                            <h3 className="font-semibold">

                                                AI Feedback

                                            </h3>

                                            <p>

                                                {answer.feedback}

                                            </p>

                                        </div>

                                        <div>

                                            <h2 className="text-2xl font-bold text-blue-600">

                                                {answer.score}/10

                                            </h2>

                                        </div>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Report;