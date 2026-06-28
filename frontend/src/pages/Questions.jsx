import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import QuestionCard from "../components/cards/QuestionCard";

function Questions() {

    const [questions, setQuestions] = useState([]);
    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("All");

    const fetchQuestions = async () => {
        try {
            const res = await api.get("/questions");
            setQuestions(res.data.questions);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const filteredQuestions = questions.filter((question) => {

        const matchesSearch = question.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesDifficulty =
            difficulty === "All" ||
            question.difficulty === difficulty;

        return matchesSearch && matchesDifficulty;

    });

    return (
        <div className="bg-gray-100 min-h-screen">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <div className="flex-1 p-8">

                    <h1 className="text-3xl font-bold mb-8">
                        Questions
                    </h1>

                    <div className="flex flex-col md:flex-row gap-4 mb-8">

                        <input
                            type="text"
                            placeholder="Search Questions..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 px-4 py-3 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <select
                            value={difficulty}
                            onChange={(e) =>
                                setDifficulty(e.target.value)
                            }
                            className="px-4 py-3 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="All">All Difficulty</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                        {filteredQuestions.length > 0 ? (

                            filteredQuestions.map((question) => (

                                <QuestionCard
                                    key={question._id}
                                    question={question}
                                />

                            ))

                        ) : (

                            <h2 className="text-gray-500 text-xl">
                                No Questions Found
                            </h2>

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Questions;