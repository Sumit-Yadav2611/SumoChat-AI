import { FaUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

function Navbar() {
  return (
    <div className="h-16 flex items-center justify-between px-8 border-b border-[#2d2e30]">
      <div className="flex items-center gap-1 cursor-pointer">
        <h2 className="text-xl font-semibold">Gemini</h2>
        <MdKeyboardArrowDown size={24} />
      </div>

      <FaUserCircle size={36} className="cursor-pointer text-gray-300" />
    </div>
  );
}

export default Navbar;