import {
  LogOut,
  User
} from 'lucide-react'
import ProfileDropdown from "./ProfileDropdown";
function Navbar() {
  
  return (
    <nav className="bg-white shadow-md h-16 flex items-center justify-between px-8">

      <h1 className="text-2xl font-bold text-blue-600">
        TalentForge AI
      </h1>

      <div className="flex items-center gap-6">

        <span className=" flex items-center gap-2 font-semibold">
         <ProfileDropdown size={20} />
          {/* Bunny */}
        </span>

        {/* <button
          className=" flex gap-2 items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
         <LogOut size={20} />
          Logout
        </button> */}

      </div>

    </nav>
  );
}

export default Navbar;