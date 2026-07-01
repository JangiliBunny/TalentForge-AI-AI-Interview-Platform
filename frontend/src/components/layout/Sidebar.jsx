import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  CircleHelp,
  ClipboardList,
  Trophy,
  BarChart3,
  LogOut,
  Bot 
} from "lucide-react";

function Sidebar() {
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

      </div>

    </div>

  );
}

export default Sidebar;