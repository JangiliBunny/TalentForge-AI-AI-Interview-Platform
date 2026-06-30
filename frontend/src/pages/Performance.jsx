import { useState, useEffect } from "react";

import api from "../services/api";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import StatCard from "../components/cards/StatCard";

import {
  FileText,
  CircleHelp,
  BarChart3,
  CheckCircle,
} from "lucide-react";

function Performance() {

  const [stats, setStats] = useState(null);
  const [recentAnswers, setRecentAnswers] = useState([]);

    useEffect(() => {
      getMyPerformance();
    }, []);

    useEffect(() => {
    getMyPerformance();
}, []);
  const getMyPerformance = async () => {
    try {

        const res = await api.get("/dashboard/performance");

        setStats(res.data.performance);

        setRecentAnswers(res.data.recentAnswers);

    } catch (err) {

        console.log(err);

    }
};

  const getRecentInterviews=async ()=>{
    try{
        const res = await api.get("/dashboard/performance");

         setStats(res.data.performance);

       setRecentAnswers(res.data.recentAnswers);
    }catch (err) {

      console.log(err);

    }
  }

  
  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 p-8">

          <div className="mb-8">
               <h1 className="text-3xl font-bold mb-3">
                   Performance
               </h1>

               <div className="bg-blue-100 text-blue-700 px-8 py-4 rounded-full inline-block mb-6">
                 📈 Your Interview Performance
               </div>
          </div>

          {stats && (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

             
                <StatCard
                   title="Average Score"
                   value={`${stats.averageScore}/10`}
                   icon={<BarChart3 size={28} />}
                />

                <StatCard
                  title="Highest Score"
                  value={`${stats.highestScore}/10`}
                  icon={<CheckCircle size={28} />}
                />

                <StatCard
                  title="Lowest Score"
                  value={`${stats.lowestScore}/10`}
                  icon={<CircleHelp size={28} />}
                />

                <StatCard
                  title="Total Answers"
                  value={stats.totalAnswers}
                  icon={<FileText size={28} />}
                />

            </div>

          )}

          <div className="mt-10">
              <h2 className="text-2xl font-bold mb-5">
                Recent Answers
              </h2>

           {recentAnswers.length === 0 ? (

    <div className="bg-white rounded-xl shadow p-6 text-center">

        <p className="text-gray-500">

            No interview answers yet.
            Complete your first interview to see your performance.

        </p>

    </div>

) : (

    <div className="space-y-4">

        {recentAnswers.map((answer) => (

            <div
                key={answer._id}
                className="bg-white rounded-xl shadow p-5"
            > 
                 {answer.question && (
                   <h3 className="font-semibold">
                     {answer.question.title}
                   </h3>
                 )}

                <h3 className="font-semibold">

                    Score: {answer.score}/10

                </h3>

                <p className="text-gray-600 mt-2">

                    {answer.feedback}

                </p>

            </div>

        ))}

    </div>

)}

</div>
        
        </div>
        </div>

      </div>


  );
}

export default Performance;