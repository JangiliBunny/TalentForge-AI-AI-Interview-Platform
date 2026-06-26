import { useState , useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import '../App.css';

function Dashboard() {
  const [stats, setStats]=useState(null);

  

  const fetchDashboard =async ()=>{
    try{
      const res=await api.get("/dashboard/stats");
      setStats(res.data.stats);
    }catch (err) {

            console.log(err);
  }
  
  
};
useEffect(()=>{

    fetchDashboard();

},[]);
return (
    <div>
        <h1>Dashboard</h1>

        {stats && (
            <>
                <h3>Total Users: {stats.totalUsers}</h3>

                <h3>Total Interviews: {stats.totalInterviews}</h3>

                <h3>Total Questions: {stats.totalQuestions}</h3>

                <h3>Completed Interviews: {stats.completedInterviews}</h3>

                <h3>Total Answers: {stats.totalAnswers}</h3>

                <h3>Average Score: {stats.averageScore}</h3>
            </>
        )}
    </div>
);

}

export default Dashboard;