import { useAuth } from "../context/AuthContext";
import UserAvatar from "../components/Common/UserAvatar";
import { FaUser, FaEnvelope, FaShieldAlt } from "react-icons/fa";
import RobotAssistant from "../components/Common/RobotAssistant";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="h-full overflow-y-auto bg-[#050816] px-5 py-6 sm:px-8">
      <div className="mx-auto max-w-xl">
        {/* ================= HEADER ================= */}

        <div className="mb-6">
          <h1
            className="
              text-3xl
              font-bold
              bg-gradient-to-r
              from-blue-400
              via-purple-500
              to-pink-500
              bg-clip-text
              text-transparent
              sm:text-4xl
            "
          >
            My Profile
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage your SumoChat AI account.
          </p>
        </div>

        {/* ================= PROFILE CARD ================= */}

        <div
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-[#0b1220]
            shadow-[0_0_35px_rgba(59,130,246,0.06)]
          "
        >
          {/* Subtle top gradient */}
          <div
            className="
              pointer-events-none
              absolute
              left-0
              right-0
              top-0
              h-32
              bg-gradient-to-r
              from-blue-500/10
              via-purple-500/10
              to-pink-500/10
            "
          />

          {/* ================= USER ================= */}

          <div
            className="
              relative
              flex
              flex-col
              items-center
              px-6
              py-8
              text-center
            "
          >
            {/* Avatar */}

            <div
              className="
                rounded-full
                bg-gradient-to-r
                from-cyan-400
                via-blue-500
                to-purple-500
                p-[2px]
                shadow-[0_0_25px_rgba(59,130,246,0.3)]
              "
            >
              <div className="rounded-full bg-[#0b1220] p-1">
                <UserAvatar user={user} size={90} />
              </div>
            </div>

            {/* Name */}

            <h2 className="mt-4 text-2xl font-bold text-white">
              {user?.name || "User"}
            </h2>

            {/* Email */}

            <p className="mt-1 text-sm text-slate-400">
              {user?.email || "No email available"}
            </p>

            {/* Account badge */}

            <div
              className="
                mt-4
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-400/20
                bg-blue-500/10
                px-3
                py-1.5
                text-xs
                text-blue-300
              "
            >
              <FaShieldAlt size={11} />
              SumoChat AI Account
            </div>
          </div>

          {/* ================= DIVIDER ================= */}

          <div className="border-t border-white/10" />

          {/* ================= ACCOUNT INFO ================= */}

          <div className="px-6 py-7 sm:px-8">
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-white">
                Account Information
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Your account details.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* NAME */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm text-slate-400">
                  <FaUser className="text-blue-400" />
                  Name
                </label>

                <div
                  className="
                    rounded-xl
                    border
                    border-white/10
                    bg-[#111827]
                    transition
                    duration-300
                    hover:border-blue-500/40
                    hover:shadow-[0_0_18px_rgba(59,130,246,0.08)]
                  "
                >
                  <input
                    value={user?.name || ""}
                    readOnly
                    className="
                      w-full
                      bg-transparent
                      px-4
                      py-3
                      text-sm
                      text-white
                      outline-none
                    "
                  />
                </div>
              </div>

              {/* EMAIL */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm text-slate-400">
                  <FaEnvelope className="text-purple-400" />
                  Email
                </label>

                <div
                  className="
                    rounded-xl
                    border
                    border-white/10
                    bg-[#111827]
                    transition
                    duration-300
                    hover:border-purple-500/40
                    hover:shadow-[0_0_18px_rgba(168,85,247,0.08)]
                  "
                >
                  <input
                    value={user?.email || ""}
                    readOnly
                    className="
                      w-full
                      bg-transparent
                      px-4
                      py-3
                      text-sm
                      text-white
                      outline-none
                    "
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate("/edit-profile")}
              className="
                mt-6
                w-full
                rounded-xl
                bg-gradient-to-r
                from-blue-500
                via-purple-500
                to-pink-500
                px-5
                py-3
                font-semibold
                text-white
                shadow-[0_0_20px_rgba(99,102,241,0.2)]
                transition
                duration-300
                hover:scale-[1.01]
                hover:shadow-[0_0_30px_rgba(99,102,241,0.35)]
              "
            >
              Edit Profile
            </button>
            {/* ================= STATUS ================= */}

            <div
              className="
                mt-6
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-emerald-400/10
                bg-emerald-400/[0.03]
                px-4
                py-3
              "
            >
              <div
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-400
                  shadow-[0_0_10px_rgba(52,211,153,0.8)]
                "
              />

              <div>
                <p className="text-xs font-medium text-emerald-300">
                  Account Active
                </p>

                <p className="text-[11px] text-slate-500">
                  Your SumoChat AI account is active.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RobotAssistant />
    </div>
  );
}

export default Profile;
