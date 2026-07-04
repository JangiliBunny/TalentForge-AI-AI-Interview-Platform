import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../services/api";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import StatCard from "../components/cards/StatCard";

import {
  FileText,
  ClipboardList,
  CircleHelp,
  BarChart3,
  CheckCircle,
} from "lucide-react";

function Dashboard() {

  const [stats, setStats] = useState(null);
  const [user, setUser] = useState(null);

   const navigate=useNavigate();
  useEffect(() => {
    fetchDashboard();
  }, []);

  useEffect(() => {

    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    setUser(loggedInUser);

}, []);

  const fetchDashboard = async () => {
    try {

      const res = await api.get("/dashboard/stats");

      setStats(res.data.stats);

    } catch (err) {

      console.log(err);
      toast.error(
        err.response?.data?.message ||
        "Something went wrong."
    );


    }
  };

  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 p-8">

          <div className="mb-8">
               <h1 className="text-3xl font-bold mb-2">
                   Welcome back, {user?.name || "User"} 👋
               </h1>

               <p className="text-gray-500 mt-5">
                  Track your interview performance and continue practicing.
                 </p>
          </div>

          {stats && (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

             
              <StatCard
                title="My Interviews"
                value={stats.totalInterviews}
                icon={<ClipboardList size={28} />}
              />

              <StatCard
                title="Completed Interviews"
                value={stats.completedInterviews}
                icon={<CheckCircle size={28} />}
              />

              <StatCard
                title="My Answers"
                value={stats.totalAnswers}
                icon={<FileText size={28} />}
              />

              <StatCard
                title="Average Score"
                value={stats.averageScore}
                icon={<BarChart3 size={28} />}
              />

              <StatCard
                 title="Total Questions"
                 value={stats.totalQuestions}
                 icon={<CircleHelp size={28} />}
              />

            </div>

          )}
        <div className="flex-1 p-8">
          <button
                onClick={() =>
                  navigate(`/interviews`)
                    }
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg m-2">
                Start New Interview
          </button>

          <button
                onClick={() =>
                  navigate(`/questions`)
                    }
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg ml-2">
                Pratice New Questions
          </button>
        </div>
        </div>

      </div>

    </div>

  );
}

export default Dashboard;