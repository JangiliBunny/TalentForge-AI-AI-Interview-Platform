import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import api from "../services/api";

function CreateInterview() {

    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);

    const [selectedQuestions, setSelectedQuestions] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        role: "",
        difficulty: "Easy"
    });

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

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleCheckbox = (id) => {

        if (selectedQuestions.includes(id)) {

            setSelectedQuestions(

                selectedQuestions.filter((q) => q !== id)

            );

        } else {

            setSelectedQuestions([

                ...selectedQuestions,

                id

            ]);

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!formData.title.trim() || !formData.role.trim()) {
            alert("Please fill in all fields.");
            return;
        }

         if (selectedQuestions.length < 3) {
            alert("Please select at least 3 questions.");
            return;
        }
        
        try {

            await api.post("/interviews", {

                ...formData,

                questions: selectedQuestions
               
            });
           

            alert("Interview Created Successfully");

            navigate("/interviews");

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

                    <div className="bg-white rounded-xl shadow-lg p-8">

                        <h1 className="text-3xl font-bold mb-8">

                            Create Interview

                        </h1>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >

                            <input
                                type="text"
                                name="title"
                                placeholder="Interview Title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3"
                                required
                            />

                            <input
                                type="text"
                                name="role"
                                placeholder="Role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3"
                                required
                            />

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

                            <h2 className="text-xl font-semibold">

                                Select Questions

                            </h2>

                            <div className="space-y-3">

                                {

                                    questions.map((question) => (

                                        <div
                                            key={question._id}
                                            className="border rounded-lg p-4 flex justify-between items-center"
                                        >

                                            <div>

                                                <h3 className="font-semibold">

                                                    {question.title}

                                                </h3>

                                                <p className="text-sm text-gray-500">

                                                    {question.topic}

                                                </p>

                                            </div>

                                            <input
                                                type="checkbox"
                                                checked={selectedQuestions.includes(question._id)}
                                                onChange={() =>
                                                    handleCheckbox(question._id)
                                                }
                                            />

                                        </div>

                                    ))

                                }

                            </div>

                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                            >

                                Create Interview

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default CreateInterview;