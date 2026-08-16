import { useState } from "react";
import {
  FaUser,
  FaBell,
  FaShieldAlt,
  FaChevronRight,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(true);

  return (
    <div className="h-full overflow-y-auto bg-[#050914] text-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 lg:px-10">
        {/* ================= HEADER ================= */}

        <div className="mb-10">
          <h1
            className="
              bg-gradient-to-r
              from-blue-400
              via-purple-400
              to-pink-500
              bg-clip-text
              text-4xl
              font-bold
              tracking-tight
              text-transparent
              sm:text-5xl
            "
          >
            Settings
          </h1>

          <p className="mt-3 text-lg text-slate-400">
            Manage your SumoChat AI preferences and account settings.
          </p>
        </div>

        {/* ================= SETTINGS CONTAINER ================= */}

        <div
          className="
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-[#0b1220]/80
            shadow-[0_0_60px_rgba(59,130,246,0.05)]
            backdrop-blur-xl
          "
        >
          {/* ================= ACCOUNT ================= */}
          <section className="p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-4">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-blue-500/10
                  text-blue-400
                  shadow-[0_0_20px_rgba(59,130,246,0.08)]
                "
              >
                <FaUser size={20} />
              </div>

              <div>
                <h2 className="text-xl font-semibold">Account</h2>

                <p className="text-sm text-slate-500">
                  Manage your account preferences
                </p>
              </div>
            </div>

            {/* Profile Button */}

            <button
              onClick={() => navigate("/profile")}
              className="
                group
                flex
                w-full
                items-center
                justify-between
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                px-5
                py-5
                text-left
                transition-all
                duration-300
                hover:-translate-y-[1px]
                hover:border-blue-500/30
                hover:bg-blue-500/[0.05]
                hover:shadow-[0_0_25px_rgba(59,130,246,0.08)]
              "
            >
              <div>
                <h3 className="text-lg font-semibold text-white">Profile</h3>

                <p className="mt-1 text-sm text-slate-500">
                  Update your profile information
                </p>
              </div>

              <FaChevronRight
                className="
                  text-slate-600
                  transition-all
                  duration-300
                  group-hover:translate-x-1
                  group-hover:text-blue-400
                "
              />
            </button>
          </section>

          {/* DIVIDER */}

          <div className="h-px bg-white/10" />

          {/* ================= NOTIFICATIONS ================= */}

          <section className="p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-4">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-pink-500/10
                  text-pink-400
                "
              >
                <FaBell size={20} />
              </div>

              <div>
                <h2 className="text-xl font-semibold">Notifications</h2>

                <p className="text-sm text-slate-500">
                  Manage notification preferences
                </p>
              </div>
            </div>

            <div
              className="
                flex
                items-center
                justify-between
                gap-5
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                px-5
                py-5
              "
            >
              <div>
                <h3 className="font-semibold text-white">Notifications</h3>

                <p className="mt-1 text-sm text-slate-500">
                  Receive important SumoChat AI updates
                </p>
              </div>

              {/* Toggle */}

              <button
                onClick={() => setNotifications(!notifications)}
                aria-label="Toggle notifications"
                className={`
                  relative
                  h-7
                  w-12
                  flex-shrink-0
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    notifications
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 shadow-[0_0_18px_rgba(99,102,241,0.3)]"
                      : "bg-slate-700"
                  }
                `}
              >
                <span
                  className={`
                    absolute
                    top-1
                    h-5
                    w-5
                    rounded-full
                    bg-white
                    shadow
                    transition-all
                    duration-300
                    ${notifications ? "left-6" : "left-1"}
                  `}
                />
              </button>
            </div>

            {notifications && (
              <p className="mt-3 flex items-center gap-2 text-xs text-emerald-400">
                <FaCheckCircle />
                Notifications are enabled
              </p>
            )}
          </section>

          {/* DIVIDER */}

          <div className="h-px bg-white/10" />

          {/* ================= SECURITY ================= */}

          <section className="p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-4">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-cyan-500/10
                  text-cyan-400
                "
              >
                <FaShieldAlt size={20} />
              </div>

              <div>
                <h2 className="text-xl font-semibold">Security</h2>

                <p className="text-sm text-slate-500">
                  Information about your account security
                </p>
              </div>
            </div>

            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                p-5
              "
            >
              <div className="flex items-start gap-4">
                <div
                  className="
                    mt-1
                    flex
                    h-9
                    w-9
                    flex-shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-500/10
                    text-emerald-400
                  "
                >
                  <FaCheckCircle />
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    Account Protected
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Your SumoChat AI account is protected with secure
                    authentication.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ================= FOOTER ================= */}

          <div
            className="
              border-t
              border-white/10
              px-6
              py-5
              text-center
              sm:px-8
            "
          >
            <p className="text-xs text-slate-600">SumoChat AI Settings</p>
          </div>
        </div>

        {/* Bottom spacing */}

        <div className="h-10" />
      </div>
    </div>
  );
}

export default Settings;
