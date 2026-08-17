import { FaCamera } from "react-icons/fa";

function UserAvatar({
  user,
  size = 42,
  onClick,
}) {
  const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-green-500",
    "bg-orange-500",
    "bg-red-500",
    "bg-cyan-500",
    "bg-indigo-500",
  ];

  const name = user?.name || "";

  const initial = name
    ? name.charAt(0).toUpperCase()
    : "?";

  const index = name
    ? name.charCodeAt(0) % colors.length
    : 0;

  // Backend URL
 const avatarUrl = user?.avatar || null;

  return (
    <div
      onClick={onClick}
      className="relative group cursor-pointer"
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="rounded-full object-cover border border-[#3a3a3a]"
          style={{
            width: size,
            height: size,
          }}
        />
      ) : (
        <div
          className={`${colors[index]} rounded-full flex items-center justify-center font-bold text-white shadow-md select-none`}
          style={{
            width: size,
            height: size,
            fontSize: size * 0.42,
          }}
        >
          {initial}
        </div>
      )}

      {/* Hover Overlay */}
      <div
        className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
      >
        <FaCamera className="text-white text-sm" />
      </div>
    </div>
  );
}

export default UserAvatar;