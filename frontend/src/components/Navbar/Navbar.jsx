import { useState, useRef, useEffect } from "react";
import { FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../Common/UserAvatar";
import useChat from "../../hooks/useChat";
import toast from "react-hot-toast";
import { uploadAvatar } from "../../services/userService";

function Navbar() {
  const { user, token, logout, updateUser } = useAuth();

  const isGuest = !user || !token;

  const navigate = useNavigate();
  const { newChat } = useChat();

  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const menuRef = useRef(null);
  const fileInputRef = useRef(null);

  // =========================================================
  // SUMOCHAT AI LOGO
  // =========================================================

  const handleLogoClick = () => {
  

    navigate("/");

    // Start a fresh chat
    newChat();
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  // =========================================================
  // CLOSE PROFILE DROPDOWN WHEN CLICKING OUTSIDE
  // =========================================================

  useEffect(() => {
    function handler(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // =========================================================
  // AVATAR UPLOAD
  // =========================================================

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
    <div
      className="
        relative
        z-40
        flex
        h-[80px]
        items-center
        justify-between
        border-b
        border-white/10
        bg-[#050816]/85
        px-8
        backdrop-blur-2xl
        shadow-[0_8px_30px_rgba(0,0,0,0.25)]
      "
    >
      {/* =====================================================
          NEON BOTTOM GLOW
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          h-px
          w-full
          bg-gradient-to-r
          from-transparent
          via-blue-500/60
          to-purple-500/60
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/4
          h-10
          w-1/2
          -translate-x-1/2
          bg-blue-500/10
          blur-2xl
        "
      />

      {/* =====================================================
          LEFT — BRAND
      ====================================================== */}

      <button
        type="button"
        onClick={handleLogoClick}
        aria-label="Go to SumoChat AI home"
        title="Go to SumoChat AI"
        className="
          group
          flex
          items-center
          gap-1.5
          rounded-xl
          px-2.5
          py-2
          outline-none
          transition-all
          duration-300
          hover:bg-white/[0.04]
          focus-visible:ring-2
          focus-visible:ring-blue-500/40
          active:scale-[0.98]
        "
      >
        {/* Brand Name */}

        <span
          className="
            bg-gradient-to-r
            from-blue-400
            via-indigo-400
            to-purple-500
            bg-clip-text
            text-xl
            font-bold
            tracking-tight
            text-transparent
            transition-all
            duration-300
            group-hover:from-cyan-300
            group-hover:via-blue-400
            group-hover:to-purple-400
            group-hover:drop-shadow-[0_0_14px_rgba(99,102,241,0.35)]
          "
        >
          SumoChat AI
        </span>

        {/* Dropdown / Navigation Arrow */}

        <MdKeyboardArrowDown
          size={22}
          className="
            text-slate-400
            transition-all
            duration-300
            group-hover:translate-y-0.5
            group-hover:text-blue-400
          "
        />
      </button>

      {/* =====================================================
          RIGHT
      ====================================================== */}

      <div ref={menuRef} className="relative">
        {/* ===================================================
            GUEST
        ==================================================== */}

        {isGuest ? (
          <div className="flex items-center gap-4">
            {/* Guest Info */}

            <div className="flex items-center gap-3">
              <div
                className="
                  rounded-full
                  bg-gradient-to-r
                  from-blue-500
                  to-purple-500
                  p-[2px]
                  shadow-[0_0_18px_rgba(99,102,241,0.35)]
                "
              >
                <UserAvatar user={{ name: "Guest" }} size={42} />
              </div>

              <div className="hidden md:block">
                <p className="font-semibold text-white">
                  Guest
                </p>

                <p className="text-xs text-slate-400">
                  Try SumoChat AI
                </p>
              </div>
            </div>

            {/* Login */}

            <button
              onClick={() => navigate("/login")}
              className="
                rounded-xl
                border
                border-white/10
                bg-white/5
                px-4
                py-2
                text-sm
                font-medium
                text-slate-200
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-blue-500/40
                hover:bg-blue-500/10
                hover:text-blue-300
                hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]
              "
            >
              Login
            </button>

            {/* Register */}

            <button
              onClick={() => navigate("/register")}
              className="
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                px-4
                py-2
                text-sm
                font-semibold
                text-white
                shadow-[0_0_18px_rgba(99,102,241,0.3)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:from-blue-500
                hover:to-purple-500
                hover:shadow-[0_0_28px_rgba(99,102,241,0.5)]
              "
            >
              Register
            </button>
          </div>
        ) : (
          <>
            {/* =================================================
                HIDDEN AVATAR INPUT
            ================================================== */}

            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              ref={fileInputRef}
              className="hidden"
              onChange={handleAvatarUpload}
            />

            {/* =================================================
                PROFILE BUTTON
            ================================================== */}

            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label="Open profile menu"
              className="
                group
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-transparent
                px-3
                py-2
                transition-all
                duration-300
                hover:border-white/10
                hover:bg-white/5
                hover:shadow-[0_0_25px_rgba(59,130,246,0.08)]
              "
            >
              {/* Avatar Glow */}

              <div
                className="
                  rounded-full
                  bg-gradient-to-br
                  from-blue-500
                  via-indigo-500
                  to-purple-500
                  p-[2px]
                  shadow-[0_0_18px_rgba(99,102,241,0.25)]
                  transition-all
                  duration-300
                  group-hover:shadow-[0_0_28px_rgba(99,102,241,0.5)]
                "
              >
                <UserAvatar user={user} size={42} />
              </div>

              {/* User Info */}

              <div className="hidden text-left sm:block">
                <p
                  className="
                    text-sm
                    font-semibold
                    text-white
                    transition-colors
                    group-hover:text-blue-300
                  "
                >
                  {user?.name}
                </p>

                <p className="max-w-[220px] truncate text-xs text-slate-400">
                  {user?.email}
                </p>
              </div>

              {/* Arrow */}

              <MdKeyboardArrowDown
                size={21}
                className={`
                  text-slate-400
                  transition-all
                  duration-300
                  group-hover:text-blue-400
                  ${open ? "rotate-180 text-blue-400" : ""}
                `}
              />
            </button>

            {/* =================================================
                PROFILE DROPDOWN
            ================================================== */}

            <div
              className={`
                absolute
                right-0
                mt-3
                w-72
                origin-top-right
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-[#08111f]/95
                shadow-[0_20px_60px_rgba(0,0,0,0.55)]
                backdrop-blur-2xl
                transition-all
                duration-200
                ${
                  open
                    ? "visible scale-100 opacity-100"
                    : "invisible scale-95 opacity-0"
                }
              `}
            >
              {/* Dropdown Top Glow */}

              <div
                className="
                  absolute
                  left-0
                  top-0
                  h-px
                  w-full
                  bg-gradient-to-r
                  from-blue-500
                  via-purple-500
                  to-transparent
                "
              />

              {/* =================================================
                  USER INFO
              ================================================== */}

              <div className="border-b border-white/10 px-5 py-5">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      rounded-full
                      bg-gradient-to-r
                      from-blue-500
                      to-purple-500
                      p-[2px]
                      shadow-[0_0_20px_rgba(99,102,241,0.3)]
                    "
                  >
                    <UserAvatar
                      user={user}
                      size={52}
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-white">
                      {user?.name}
                    </h3>

                    <p className="truncate text-sm text-slate-400">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================================
                  CHANGE PHOTO
              ================================================== */}

              <button
                onClick={() =>
                  !uploading && fileInputRef.current?.click()
                }
                className="
                  group
                  flex
                  w-full
                  items-center
                  gap-3
                  px-5
                  py-4
                  text-slate-300
                  transition-all
                  duration-200
                  hover:bg-blue-500/10
                  hover:text-blue-300
                "
              >
                <span
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-500/10
                    text-lg
                    transition-all
                    group-hover:bg-blue-500/20
                    group-hover:shadow-[0_0_15px_rgba(59,130,246,0.25)]
                  "
                >
                  📷
                </span>

                <span>
                  {uploading ? "Uploading..." : "Change Photo"}
                </span>
              </button>

              {/* =================================================
                  PROFILE
              ================================================== */}

              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/profile");
                }}
                className="
                  group
                  flex
                  w-full
                  items-center
                  gap-3
                  px-5
                  py-4
                  text-slate-300
                  transition-all
                  duration-200
                  hover:bg-purple-500/10
                  hover:text-purple-300
                "
              >
                <span
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-purple-500/10
                  "
                >
                  <FaUser />
                </span>

                <span>Profile</span>
              </button>

              {/* =================================================
                  SETTINGS
              ================================================== */}

              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/settings");
                }}
                className="
                  group
                  flex
                  w-full
                  items-center
                  gap-3
                  px-5
                  py-4
                  text-gray-300
                  transition-all
                  duration-300
                  hover:bg-gradient-to-r
                  hover:from-blue-500/10
                  hover:via-purple-500/10
                  hover:to-transparent
                  hover:text-white
                "
              >
                <span
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    bg-blue-500/10
                    text-blue-400
                    transition-all
                    duration-300
                    group-hover:bg-blue-500/20
                    group-hover:shadow-[0_0_15px_rgba(59,130,246,0.25)]
                  "
                >
                  <FaCog />
                </span>

                <span className="font-medium">
                  Settings
                </span>

                <span
                  className="
                    ml-auto
                    text-gray-600
                    opacity-0
                    transition-all
                    duration-300
                    group-hover:translate-x-1
                    group-hover:text-blue-400
                    group-hover:opacity-100
                  "
                >
                  →
                </span>
              </button>

              {/* =================================================
                  LOGOUT
              ================================================== */}

              <button
                onClick={handleLogout}
                className="
                  group
                  flex
                  w-full
                  items-center
                  gap-3
                  border-t
                  border-white/10
                  px-5
                  py-4
                  text-slate-300
                  transition-all
                  duration-200
                  hover:bg-red-500/10
                  hover:text-red-400
                "
              >
                <span
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-red-500/10
                  "
                >
                  <FaSignOutAlt />
                </span>

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