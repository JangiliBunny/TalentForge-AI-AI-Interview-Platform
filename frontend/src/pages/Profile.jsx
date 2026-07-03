import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import api from "../services/api";
import StatCard from "../components/cards/StatCard";
import { useNavigate } from "react-router-dom";

import {
  FileText,
  CircleHelp,
  BarChart3,
  CheckCircle,
  ClipboardList,
  LogOut
} from "lucide-react";


function Profile() {
    const navigate=useNavigate();
    const [user, setUser] = useState(null);
   const [stats, setStats] = useState(null);
    const fetchProfile = async () => {
        try {
            const res = await api.get("/auth/me");
            setUser(res.data.user);
        } catch (err) {
            console.log(err);
        }
    };

    
    
    const  fetchPerformance=async ()=>{
        try{
            const res=await api.get("/dashboard/performance");
            setStats(res.data.performance);
        }catch (err) {
            console.log(err);
        }
    }

    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    useEffect(()=>{
        fetchPerformance();
    },[]);

    if (!user) {
        return (
            <h1 className="text-center text-2xl mt-10">
                Loading...
           </h1>
        );
    }
    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-8">
                    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
                        {/* Avatar */}
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold">
                                    {user.name}
                                </h1>
                                <p className="text-gray-500">
                                    {user.email}
                                </p>
                                <span className="inline-block mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                                    {user.role}
                                </span>
                            </div>
                        </div>
                        <hr className="my-8" />
                        {/* Details */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-gray-500">
                                    Name
                                </h3>
                                <p className="font-semibold">
                                    {user.name}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-gray-500">
                                    Email
                                </h3>
                                <p className="font-semibold">
                                    {user.email}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-gray-500">
                                    Role
                                </h3>
                                <p className="font-semibold capitalize">
                                    {user.role}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-gray-500">
                                    Joined On
                                </h3>
                                <p className="font-semibold">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-4xl  mt-5 mx-auto bg-white rounded-xl shadow-lg p-8">
                    {stats && (

            <div className="grid grid-cols-1 mt-5 md:grid-cols-2 xl:grid-cols-3 gap-6">

                <StatCard
                title="My Interviews"
                value={`${stats.totalInterviews}`}
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
           </div>
             <div className="max-w-4xl flex gap-50 mt-5 mx-auto bg-white rounded-xl shadow-lg p-8" >
               {/* <div flex gap-4 items-center mt-10> */}
                 <button
                    onClick={() => navigate("/profile/edit")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                  >
                    Edit Profile
                 </button>

                  <button
                   onClick={() => navigate("/change-password")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg"
                  >  
                   Change Password
                 </button>
 
                 <button
                   onClick={handleLogout}
                   className="bg-red-600 hover:bg-red-700 flex items-center text-white px-6 py-3 rounded-lg"
                 >
                 <LogOut size={20}/> Logout
                </button>
             </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;