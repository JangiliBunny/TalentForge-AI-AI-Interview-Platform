import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import api from "../services/api";

function Interview() {
    const { id } = useParams();
    const navigate=useNavigate();
    const [interview, setInterview] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);

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

    // Prevent refresh
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener(
                "beforeunload",
                handleBeforeUnload
            );
        };
    }, []);

    if (!interview) {
        return (
            <h1 className="text-center text-3xl mt-10">
                Loading...
            </h1>
        );
    }

    const question = interview.questions[currentQuestion];

    const progress =
        ((currentQuestion + 1) /
            interview.questions.length) *
        100;

    const handleNext = () => {
        if (currentQuestion < interview.questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

   const handleFinish = async () => {

    if (
        !window.confirm(
            "Are you sure you want to submit the interview?"
        )
    ) {
        return;
    }

    const payload = interview.questions.map((question, index) => ({
        questionId: question._id,
        answerText: answers[index]?.trim() || ""
    }));

    setLoading(true);

    try {

        await api.post(
            `/interviews/${id}/submit`,
            {
                answers: payload
            }
        );

        navigate(`/report/${id}`);

    } catch (err) {

        console.log(err);

        toast.error(
            err.response?.data?.message ||
            "Failed to submit interview."
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

                    <div className="bg-white rounded-xl shadow-xl p-8 max-w-5xl mx-auto">

                        <h1 className="text-3xl font-bold">

                            {interview.title}

                        </h1>

                        <p className="text-gray-500 mt-2">

                            Question {currentQuestion + 1} of{" "}
                            {interview.questions.length}

                        </p>

                        {/* Progress */}

                        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">

                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                style={{
                                    width: `${progress}%`,
                                }}
                            />

                        </div>

                        <div className="flex justify-between mt-2 text-sm text-gray-500">

                            <span>

                                Remaining Questions :{" "}
                                {interview.questions.length -
                                    currentQuestion -
                                    1}

                            </span>

                            <span>

                                {Math.round(progress)}%

                            </span>

                        </div>

                        <hr className="my-6" />

                        <h2 className="text-2xl font-semibold">

                            {question.title}

                        </h2>

                        <p className="text-gray-700 mt-4">

                            {question.description}

                        </p>

                        <div className="flex gap-3 mt-4">

                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">

                                {question.topic}

                            </span>

                            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">

                                {question.difficulty}

                            </span>

                        </div>

                        <textarea
                            rows="8"
                            placeholder="Write your answer here..."
                            value={answers[currentQuestion] || ""}
                            onChange={(e) =>
                                setAnswers({
                                    ...answers,
                                    [currentQuestion]:
                                        e.target.value,
                                })
                            }
                            className="w-full border rounded-lg mt-8 p-4 focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                        <div className="flex justify-end mt-2">

                            <span className="text-gray-500 text-sm">

                                {(answers[currentQuestion] || "")
                                    .length}{" "}
                                characters

                            </span>

                        </div>

                        <div className="flex justify-between mt-8">

                            <button
                                onClick={handlePrevious}
                                disabled={currentQuestion === 0}
                                className="px-6 py-2 rounded-lg bg-gray-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>

                            {currentQuestion ===
                            interview.questions.length - 1 ? (

                               <button
                                 onClick={handleFinish}
                                 disabled={
                                 !answers[currentQuestion]?.trim() || loading
                                 }
                                 className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                {loading ? (
                                 <>
                                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                 <span>Submitting...</span>
                                </>
                                 ) : (
                                 "Finish Interview"
                               )}
                             </button>

                            ) : (

                                <button
                                    onClick={handleNext}
                                    disabled={
                                        !answers[
                                            currentQuestion
                                        ]?.trim()
                                    }
                                    className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >

                                    Next

                                </button>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Interview;