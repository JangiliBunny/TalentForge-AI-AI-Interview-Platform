import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import InterviewCard from "../components/cards/InterviewCard";

import {
  Bot
} from "lucide-react";


function Interviews() {
    const navigate=useNavigate();
    const [interviews, setInterviews] = useState([]);

    const fetchInterviews = async () => {

        try {
            const res = await api.get("/interviews/me/interviews");
            setInterviews(res.data.interview);

        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {

        fetchInterviews();

    }, []);

    return (

        <div className="bg-gray-100 min-h-screen">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <div className="flex-1 p-8">
                   
                    <h1 className="text-3xl font-bold mb-8">
                        My Interviews
                    </h1>
                    <button
                       onClick={() => navigate("/create-interview")}
                       className="bg-blue-600 text-white px-5 py-2 rounded-lg mb-5"
                     >   + Create Interview
                    </button>
                    <button
                            onClick={() => navigate("/generate-interview")}
                            className="bg-green-600 text-white px-12 py-2 ml-4 rounded-lg mb-5"
                    >
                              AI Create Interview
                    </button>
                    {interviews.length > 0 ? (

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                            {interviews.map((interview) => (

                                <InterviewCard
                                    key={interview._id}
                                    interview={interview}
                                />

                            ))}

                        </div>

                    ) : (

                        <div className="bg-white p-8 rounded-xl shadow-md text-center">

                            <h2 className="text-xl font-semibold text-gray-500">
                                No Interviews Found
                            </h2>

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}

export default Interviews;