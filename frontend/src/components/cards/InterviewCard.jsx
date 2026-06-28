import { useNavigate } from "react-router-dom";

function InterviewCard({ interview }) {

    const navigate = useNavigate();

    return (

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">

            <div className="flex justify-between">

                <h2 className="text-xl font-semibold">
                    {interview.role}
                </h2>

                <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        interview.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                    {interview.status}
                </span>

            </div>

            <p className="mt-3">
                Difficulty :
                <span className="font-medium ml-2">
                    {interview.difficulty}
                </span>
            </p>

            <p className="mt-2">
                Questions :
                <span className="font-medium ml-2">
                    {interview.questions.length}
                </span>
            </p>

            <div className="flex gap-3 mt-6">

                <button
                    onClick={() => navigate(`/interviews/${interview._id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >   View
               </button>

                {interview.status === "pending" ? (

                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                        Start
                    </button>

                ) : (

                    <button
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                    >
                        Report
                    </button>

                )}

            </div>

        </div>

    );

}

export default InterviewCard;