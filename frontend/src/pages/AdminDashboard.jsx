import { useState,useEffect } from "react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import StatCard from "../components/cards/StatCard";
import api from "../services/api";
import toast from "react-hot-toast";

import {
  ClipboardList,
  CircleHelp,
  BarChart3,
  CheckCircle,
  Users
} from "lucide-react";


function AdminDashboard(){
    const [stats, setStats]=useState(null);
    const FectcDashboard =async ()=>{
        try{
            const res=await api.get("/admin/dashboard");
            setStats(res.data.stats);
        }catch(err){
            console.error(err);

         toast.error(
           err.response?.data?.message ||
           "Something went wrong."
    );
        }
    }

    useEffect(()=>{
      FectcDashboard();
    },[]);

    return (
      <div className="bg-gray-100 min-h-screen">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <div className="flex-1 p-8">

                    <h1 className="text-4xl font-bold mb-2">

                        Admin Dashboard

                    </h1>

                    <p>PlatForm Overview</p>
                    {
                        stats && (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            <StatCard
                              title="Total Users"
                              value={stats.totalUsers}
                              icon={<Users size={28} />}
                            />

                            <StatCard
                              title="Total Questions"
                              value={stats.totalQuestions}
                              icon={<CircleHelp size={28} />}
                            />
                             <StatCard
                              title="Total Interviews"
                              value={stats.totalInterviews}
                              icon={<ClipboardList size={28} />}
                            />
                             <StatCard
                              title="Completed Interviews"
                              value={stats.completedInterviews}
                              icon={<CheckCircle size={28} />}
                            />
                            <StatCard
                                 title="Average Score"
                                 value={`${stats.averageScore}/10`}
                                 icon={<BarChart3 size={28} />}
                            />
                            
                          </div>
                        )
                    }
                </div>
                
             </div>
        </div>              
    );
}

export default AdminDashboard;