import { useNavigate } from "react-router-dom";
function QuestionCard({ question }) {
    
  const navigate = useNavigate();

  const difficultyColor = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Hard: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">

      <div className="flex justify-between items-center">

        <h2 className="text-xl font-semibold">
          {question.title}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColor[question.difficulty]}`}
        >
          {question.difficulty}
        </span>

      </div>

      <p className="text-gray-600 mt-3">
        Topic:
        <span className="font-medium ml-2">
          {question.topic}
        </span>
      </p>

      
      <button
         onClick={() => navigate(`/questions/${question._id}`)}
         className="mt-5 ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
         View Details
      </button>

      <button
       onClick={() => navigate(`/interview/${question._id}`)}
       className="mt-5 ml-5 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        Start Interview
      </button>

    </div>
  );
}

export default QuestionCard;