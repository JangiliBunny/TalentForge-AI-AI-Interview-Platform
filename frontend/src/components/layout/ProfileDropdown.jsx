import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Trophy,
  BarChart3,
  LogOut,
  Bot ,User
} from "lucide-react";

function ProfileDropdown() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const storedUser = localStorage.getItem("user");

const user = storedUser
    ? JSON.parse(storedUser)
    : null;
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };
    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
            >
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
            </button>
            {
                open && (
                    <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-xl border">
                        <div className="p-5 border-b ">
                            <h2 className="font-bold mb-1">
                                {user?.name}
                            </h2>
                            <p className="text-sm text-gray-500 pb-1">
                                {user?.email}
                            </p>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                {user?.role}
                            </span>
                        </div>
                        <button
                            onClick={() => navigate("/profile")}
                            className=" flex gap-2 items-center w-full text-left px-5 py-3   hover:bg-gray-100"
                        >
                           <User size={18} /> Profile
                        </button>
                        <button
                            onClick={() => navigate("/performance")}
                            className="w-full flex gap-2 items-center text-left px-5 py-3 hover:bg-gray-100"
                        >
                           <BarChart3 size={18}/> Performance
                        </button>
                        <button
                            onClick={() => navigate("/leaderboard")}
                            className="w-full text-left flex gap-2 items-center px-5 py-3 hover:bg-gray-100"
                        >
                           <Trophy size={18}/> Leaderboard
                        </button>
                        <button
                            onClick={() => navigate("/generate-interview")}
                            className="w-full text-left flex gap-2 items-center px-5 py-3 hover:bg-gray-100"
                        >
                            <Bot size={18}/> AI Interview
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left flex gap-2 items-center px-5 py-3 text-red-600 hover:bg-red-50"
                        >
                            <LogOut size={18}/> Logout
                        </button>
                    </div>
                )
            }
        </div>
    );
}

export default ProfileDropdown;