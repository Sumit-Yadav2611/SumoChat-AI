import { useAuth } from "../context/AuthContext";
import UserAvatar from "../components/Common/UserAvatar";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#131314] text-white flex justify-center p-10">
      <div className="w-full max-w-3xl bg-[#1f1f1f] rounded-3xl shadow-xl border border-[#303030] p-8">

        <h1 className="text-3xl font-bold mb-8">
          My Profile
        </h1>

        <div className="flex flex-col items-center gap-4">

          <UserAvatar
            user={user}
            size={110}
          />

          <h2 className="text-2xl font-semibold">
            {user?.name}
          </h2>

          <p className="text-gray-400">
            {user?.email}
          </p>

        </div>

        <div className="mt-10 space-y-6">

          <div>
            <label className="block text-gray-400 mb-2">
              Name
            </label>

            <input
              value={user?.name || ""}
              readOnly
              className="w-full bg-[#2a2a2a] rounded-xl p-3 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">
              Email
            </label>

            <input
              value={user?.email || ""}
              readOnly
              className="w-full bg-[#2a2a2a] rounded-xl p-3 outline-none"
            />
          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;