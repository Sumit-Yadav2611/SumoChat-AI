import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
} from "react-icons/fa";

import ChatRobot from "../components/Common/ChatRobot";
import { registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

    setLoading(true);

    try {
      const data = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      login(data.user, data.token);

      alert("Registration Successful!");

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        relative
        min-h-screen
        w-full
        overflow-x-hidden
        overflow-y-auto
        bg-[#050914]
        text-white
      "
    >
      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          -top-40
          h-[500px]
          w-[500px]
          rounded-full
          bg-blue-600/10
          blur-[130px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -right-40
          h-[500px]
          w-[500px]
          rounded-full
          bg-purple-600/10
          blur-[130px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[400px]
          w-[400px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-pink-500/5
          blur-[120px]
        "
      />

      {/* =====================================================
          BACK BUTTON
      ===================================================== */}

      <button
        onClick={() => navigate("/")}
        className="
          absolute
          left-4
          top-4
          z-30
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-white/10
          bg-white/[0.03]
          px-4
          py-2.5
          text-sm
          text-slate-400
          backdrop-blur-xl
          transition-all
          duration-300
          hover:border-blue-500/30
          hover:bg-blue-500/10
          hover:text-blue-400
          sm:left-6
          sm:top-6
        "
      >
        <FaArrowLeft />
        <span>Back</span>
      </button>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div
        className="
    relative
    z-10
    flex
    min-h-screen
    w-full
    items-start
    justify-center
    px-4
    pb-10
    pt-8
    sm:px-6
    sm:pb-12
    sm:pt-10
  "
      >
        {/* ===================================================
            REGISTER CARD
        =================================================== */}

        <div
          className="
  relative
  w-full
  max-w-lg
  overflow-hidden
  rounded-3xl
  border
  border-white/10
  bg-[#0b1220]/95
  px-6
  py-5
  shadow-[0_0_70px_rgba(59,130,246,0.10)]
  backdrop-blur-2xl
  sm:px-8
  sm:py-6
"
        >
          {/* Top neon line */}
          <div
            className="
              absolute
              left-0
              right-0
              top-0
              h-[2px]
              bg-gradient-to-r
              from-blue-500
              via-purple-500
              to-pink-500
            "
          />

          {/* =================================================
              ROBOT LOGO
          ================================================= */}

          <div className="flex justify-center -mb-2 scale-90">
            <ChatRobot />
          </div>

          {/* =================================================
              TITLE
          ================================================= */}

          <div className="mt-2 text-center sm:mt-3">
            <h1
              className="
                bg-gradient-to-r
                from-blue-400
                via-purple-400
                to-pink-500
                bg-clip-text
                text-3xl
                font-bold
                text-transparent
                sm:text-4xl
              "
            >
              Create Account
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-slate-500 sm:text-base">
              Join SumoChat AI and start chatting intelligently.
            </p>
          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form onSubmit={handleSubmit} className="mt-5 sm:mt-6">
            {/* NAME */}

            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Full Name
              </label>

              <div className="relative">
                <FaUser
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                  "
                />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    py-3.5
                    pl-11
                    pr-4
                    text-white
                    outline-none
                    transition-all
                    placeholder:text-slate-600
                    focus:border-blue-500/50
                    focus:bg-blue-500/[0.03]
                    focus:shadow-[0_0_20px_rgba(59,130,246,0.08)]
                  "
                  required
                />
              </div>
            </div>

            {/* EMAIL */}

            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email
              </label>

              <div className="relative">
                <FaEnvelope
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                  "
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    py-3.5
                    pl-11
                    pr-4
                    text-white
                    outline-none
                    transition-all
                    placeholder:text-slate-600
                    focus:border-blue-500/50
                    focus:bg-blue-500/[0.03]
                    focus:shadow-[0_0_20px_rgba(59,130,246,0.08)]
                  "
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Password
              </label>

              <div className="relative">
                <FaLock
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                  "
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={handleChange}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    py-3.5
                    pl-11
                    pr-12
                    text-white
                    outline-none
                    transition-all
                    placeholder:text-slate-600
                    focus:border-blue-500/50
                    focus:bg-blue-500/[0.03]
                    focus:shadow-[0_0_20px_rgba(59,130,246,0.08)]
                  "
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                    transition
                    hover:text-blue-400
                  "
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Confirm Password
              </label>

              <div className="relative">
                <FaLock
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                  "
                />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    py-3.5
                    pl-11
                    pr-12
                    text-white
                    outline-none
                    transition-all
                    placeholder:text-slate-600
                    focus:border-purple-500/50
                    focus:bg-purple-500/[0.03]
                    focus:shadow-[0_0_20px_rgba(168,85,247,0.08)]
                  "
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                    transition
                    hover:text-purple-400
                  "
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* REGISTER BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="
                relative
                w-full
                overflow-hidden
                rounded-xl
                bg-gradient-to-r
                from-blue-500
                via-purple-500
                to-pink-500
                py-3.5
                font-semibold
                text-white
                shadow-[0_0_25px_rgba(99,102,241,0.18)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_0_35px_rgba(99,102,241,0.30)]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            {/* LOGIN */}

            <p className="mt-4 pb-0 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="
                  font-medium
                  text-blue-400
                  transition
                  hover:text-purple-400
                "
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
