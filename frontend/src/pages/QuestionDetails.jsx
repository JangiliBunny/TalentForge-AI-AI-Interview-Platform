import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import api from "../services/api";

function QuestionDetails() {

    const { id } = useParams();

    const [question, setQuestion] = useState(null);

    useEffect(() => {
        fetchQuestion();

    }, []);

    const fetchQuestion = async () => {
        try {

            const res = await api.get(`/questions/${id}`);

            setQuestion(res.data.question);

        } catch (err) {

            console.log(err);

        }

    };

    if (!question)
        return <h1>Loading...</h1>;

    return (

        <div className="bg-gray-100 min-h-screen">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <div className="flex-1 p-8">

                    <div className="bg-white rounded-xl shadow-md p-8">

                        <h1 className="text-3xl font-bold">
                            {question.title}
                        </h1>

                        <p className="mt-6">
                            <strong>Topic:</strong> {question.topic}
                        </p>

                        <p className="mt-3">
                            <strong>Difficulty:</strong> {question.difficulty}
                        </p>

                        <p className="mt-6 text-gray-700">
                            <strong>Description:</strong>{question.description}
                        </p>

                        

                    </div>

                </div>

            </div>

        </div>

    );

}

export default QuestionDetails;