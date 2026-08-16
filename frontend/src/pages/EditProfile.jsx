import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUser, FaEnvelope } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import UserAvatar from "../components/Common/UserAvatar";
import toast from "react-hot-toast";

function EditProfile() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setSaving(true);

    try {
      updateUser({
        ...user,
        name: name.trim(),
      });

      toast.success("Profile updated!");

      setTimeout(() => {
        navigate("/profile");
      }, 500);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-[#050816] px-5 py-6 sm:px-8">
      <div className="mx-auto max-w-3xl">

        {/* Back */}
        <button
          onClick={() => navigate("/profile")}
          className="
            mb-6
            flex
            items-center
            gap-2
            text-sm
            text-slate-400
            transition
            hover:text-white
          "
        >
          <FaArrowLeft size={13} />
          Back to Profile
        </button>

        {/* Heading */}
        <div className="mb-6">
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
            "
          >
            Edit Profile
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Update your SumoChat AI profile information.
          </p>
        </div>

        {/* Card */}
        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-[#0b1220]
            p-6
            shadow-[0_0_35px_rgba(59,130,246,0.06)]
            sm:p-8
          "
        >

          {/* Avatar */}
          <div className="mb-8 flex flex-col items-center">
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
                <UserAvatar
                  user={user}
                  size={90}
                />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Profile photo can be changed from your account menu.
            </p>
          </div>

          {/* Name */}
          <div className="mb-5">
            <label className="mb-2 flex items-center gap-2 text-sm text-slate-400">
              <FaUser className="text-blue-400" />
              Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#111827]
                px-4
                py-3
                text-white
                outline-none
                transition
                focus:border-blue-500/50
                focus:shadow-[0_0_20px_rgba(59,130,246,0.1)]
              "
            />
          </div>

          {/* Email */}
          <div className="mb-8">
            <label className="mb-2 flex items-center gap-2 text-sm text-slate-400">
              <FaEnvelope className="text-purple-400" />
              Email
            </label>

            <input
              value={user?.email || ""}
              readOnly
              className="
                w-full
                cursor-not-allowed
                rounded-xl
                border
                border-white/10
                bg-[#080d18]
                px-4
                py-3
                text-slate-500
                outline-none
              "
            />

            <p className="mt-2 text-xs text-slate-600">
              Email address cannot be changed here.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">

            <button
              onClick={() => navigate("/profile")}
              className="
                flex-1
                rounded-xl
                border
                border-white/10
                bg-white/[0.04]
                px-5
                py-3
                font-medium
                text-slate-300
                transition
                hover:bg-white/[0.08]
                hover:text-white
              "
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="
                flex-1
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
                hover:shadow-[0_0_30px_rgba(99,102,241,0.35)]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default EditProfile;