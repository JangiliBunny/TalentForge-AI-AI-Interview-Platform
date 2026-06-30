import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import api from "../services/api";

function Report() {

    const { id } = useParams();

    const [report, setReport] = useState(null);
    const navigate=useNavigate();

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

    const getScoreColor = (score) => {

    if(score >= 8)
        return "text-green-600";

    if(score >= 5)
        return "text-yellow-500";

    return "text-red-600";

}

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

                    <div className="mb-8">

                        <h1 className="text-4xl font-bold">
                            Interview Report
                        </h1>

                        <h3 className="text-gray-800 mt-2">

                          {report.interviewTitle}

                         </h3>

                    </div>

                    <div className="mb-8">

                        <span className="bg-green-100 text-green-700 px-8 py-4 rounded-full font-medium">

                           ✅ Interview Completed Successfully

                        </span>

                    </div>

                    {/* Summary */}

                    <div className="grid md:grid-cols-5 gap-6 mb-8">

                        <div className="bg-white rounded-xl shadow p-6">

                            <h2 className="text-gray-500">

                                Average Score

                            </h2>

                            {/* <p className="text-3xl font-bold">

                                {report.averageScore}/10

                            </p> */}
                            <h2 className={`text-3xl font-bold ${getScoreColor(report.averageScore)}`}>
                               {report.averageScore}/10
                            </h2>

                        </div>

                        <div className="bg-white rounded-xl shadow p-6">

                            <h2 className="text-gray-500">

                                Questions

                            </h2>

                            <p className="text-3xl font-bold ">

                                {report.totalQuestions}

                            </p>

                        </div>
                        <div className="bg-white rounded-xl shadow p-6">
                            <h2 className="text-gray-500">
                             Completed On
                            </h2>

                            <p className="font-semibold ">
                               {new Date().toLocaleDateString()}
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow p-6">

                            <h2 className="text-gray-500">

                                Role

                            </h2>

                            <p className="font-semibold ">

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

                                    <h2 className="text-xl font-bold mb-3">

                                        Question {index + 1}

                                    </h2>
                                     <p className="text-xl font-bold">

                                        {answer.question.title}

                                     </p>

                                    <div className="flex gap-3 mt-3 mb-3">

                                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                        {answer.question.topic}
                                      </span>

                                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                                        {answer.question.difficulty}
                                      </span>
                                    </div>

                                    <p className="mt-4">

                                        <strong> 📝 Your Answer:</strong>

                                    </p>

                                    <div className="bg-gray-100 rounded-lg p-4 mt-2 max-h-48 overflow-y-auto whitespace-pre-wrap">

                                        {answer.answerText}

                                    </div>

                                    <div className="flex justify-between mt-6">

                                        <div>

                                            <h3 className="font-semibold">

                                               🤖  AI Feedback

                                            </h3>

                                            <p>

                                                {answer.feedback}

                                            </p>

                                        </div>

                                        <div>

                                            <h2 className={`text-2xl font-bold text-blue-600 ${getScoreColor(answer.score)}`}>

                                                {answer.score}/10

                                            </h2>

                                        </div>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                    {/* <button className="bg-blue-600 text-white px-6 py-3 rounded-lg 
                       onClick={() => {
                      navigate(`/dashboard`);" >
                        Dashboard
                    </button> */}
                  <div className="flex justify-center gap-4 mt-10">
                    <button
                      className="bg-blue-600 hover:bg-blue-700  text-white px-6 py-3 rounded-lg"
                      onClick={() => {
                      // console.log("Clicked", interview._id);
                      navigate(`/dashboard`);
                    }}>
                     Dashboard
                    </button> 

                    <button
                      onClick={() =>
                             navigate(`/interview/${id}`)}
                             className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                     >
                        Retake Interview
                    </button>
                </div>


                </div>

            </div>

        </div>

    );

}

export default Report;