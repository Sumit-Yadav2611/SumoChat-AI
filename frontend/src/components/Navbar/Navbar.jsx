import { useState, useRef, useEffect } from "react";
import { FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../Common/UserAvatar";
import toast from "react-hot-toast";
import { uploadAvatar } from "../../services/userService";

function Navbar() {
  const { user, token, logout, updateUser } = useAuth();

  const isGuest = !user || !token;

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const menuRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  useEffect(() => {
    function handler(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setUploading(true);

    try {
      const data = await uploadAvatar(file, token);

      updateUser(data.user);

      toast.success("Profile photo updated!");
    } catch (err) {
      console.error(err);

      toast.error("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="h-16 flex items-center justify-between px-8 border-b border-[#2d2e30] bg-[#131314]">

      {/* Left */}
      <div className="flex items-center gap-2 cursor-pointer">
        <h2 className="text-xl font-semibold text-white">
          SumoChat AI
        </h2>

        <MdKeyboardArrowDown
          size={22}
          className="text-gray-400"
        />
      </div>

      {/* Right */}
      <div ref={menuRef} className="relative">

        {isGuest ? (

          <div className="flex items-center gap-4">

            <div className="flex items-center gap-3">

              <UserAvatar
                user={{ name: "Guest" }}
                size={42}
              />

              <div className="hidden md:block">
                <p className="font-semibold text-white">
                  Guest
                </p>

                <p className="text-xs text-gray-400">
                  Try SumoChat AI
                </p>
              </div>

            </div>

            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-lg bg-[#2d2e30] hover:bg-[#3a3b3d] transition"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
            >
              Register
            </button>

          </div>

        ) : (

          <>
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              ref={fileInputRef}
              className="hidden"
              onChange={handleAvatarUpload}
            />

            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#2d2e30] transition"
            >
              <UserAvatar user={user} size={42} />

              <div className="text-left hidden sm:block">
                <p className="text-sm font-semibold text-white">
                  {user?.name}
                </p>

                <p className="text-xs text-gray-400">
                  {user?.email}
                </p>
              </div>

              <MdKeyboardArrowDown
                className={`text-gray-400 transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            <div
              className={`absolute right-0 mt-3 w-72 rounded-2xl bg-[#1f1f1f] border border-[#333] shadow-2xl overflow-hidden origin-top-right transition-all duration-200 ${
                open
                  ? "opacity-100 scale-100 visible"
                  : "opacity-0 scale-95 invisible"
              }`}
            >
              {/* User Info */}
              <div className="px-5 py-4 border-b border-[#303030]">
                <div className="flex items-center gap-3">

                  <UserAvatar
                    user={user}
                    size={52}
                    onClick={() => fileInputRef.current.click()}
                  />

                  <div>
                    <h3 className="text-white font-semibold">
                      {user?.name}
                    </h3>

                    <p className="text-sm text-gray-400">
                      {user?.email}
                    </p>
                  </div>

                </div>
              </div>

              <button
                onClick={() =>
                  !uploading && fileInputRef.current.click()
                }
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-[#2d2e30] transition"
              >
                📷

                <span>
                  {uploading
                    ? "Uploading..."
                    : "Change Photo"}
                </span>
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/profile");
                }}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-[#2d2e30] transition"
              >
                <FaUser />

                <span>Profile</span>
              </button>

              <button
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-[#2d2e30] transition"
              >
                <FaCog />

                <span>Settings</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-4 border-t border-[#303030] hover:bg-red-600 transition"
              >
                <FaSignOutAlt />

                <span>Logout</span>
              </button>

            </div>
          </>
        )}

      </div>

    </div>
  );
}

export default Navbar;