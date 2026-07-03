import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  CircleHelp,
  ClipboardList,
  Trophy,
  BarChart3,
  Bot ,
  User,
  Users
} from "lucide-react";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (

    <div className="w-64 bg-gray-900 text-white min-h-screen p-6">

      <h2 className="text-xl font-bold mb-8">
        Menu
      </h2>

      <div className="space-y-4">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <LayoutDashboard size={20} />
              Dashboard
        </Link>

        <Link
          to="/questions"
          className="flex items-center gap-3  hover:text-blue-400"
        >
          <CircleHelp size={20} />
            Questions
        </Link>

        <Link
          to="/interviews"
          className="flex items-center gap-3  hover:text-blue-400"
        >
            <ClipboardList size={20} />
             Interviews
        </Link>
         <Link
            to="/generate-interview"
            className="flex items-center gap-2 hover:text-blue-600"
         >  
         <Bot size={20}/> AI Interview
         </Link>
        <Link
          to="/leaderboard"
          className="flex items-center gap-3  hover:text-blue-400"
        >
            <Trophy size={20}/>
          Leaderboard
        </Link>

        <Link
          to="/performance"
          className="flex items-center gap-3  hover:text-blue-400"
        >
            <BarChart3 size={20}/>
           Performance
        </Link>
        

      {user?.role === "admin" && (
   <>
    <Link
        to="/admin"
        className="flex items-center gap-3 hover:text-blue-400"
    >
        <LayoutDashboard size={20} />
        <span>Admin Dashboard</span>
    </Link>

    <Link
        to="/admin/users"
        className="flex items-center gap-3 hover:text-blue-400"
    >
        <Users size={20} />
        <span>Users</span>
    </Link>

    <Link
        to="/admin/questions"
        className="flex items-center gap-3 hover:text-blue-400"
    >
        <CircleHelp size={20} />
        <span>Questions</span>
    </Link>

    <Link
        to="/admin/interviews"
        className="flex items-center gap-3 hover:text-blue-400"
    >
        <ClipboardList size={20} />
        <span>Interviews</span>
    </Link>
</>

     )}
     <Link
         to="/profile"
         className="flex items-center gap-2 hover:text-blue-600"
        >
         <User size={20}/>Profile
        </Link>

      </div>

    </div>

  );
}

export default Sidebar;