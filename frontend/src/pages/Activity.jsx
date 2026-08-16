import { FaHistory, FaComments, FaFilePdf, FaImage } from "react-icons/fa";

function Activity() {
  const activities = [
    {
      icon: <FaComments />,
      title: "Chat conversation",
      description: "You started a new AI conversation.",
      time: "Recently",
    },
    {
      icon: <FaFilePdf />,
      title: "PDF uploaded",
      description: "A PDF document was uploaded for analysis.",
      time: "Recently",
    },
    {
      icon: <FaImage />,
      title: "Image analyzed",
      description: "An image was analyzed using Gemini Vision.",
      time: "Recently",
    },
  ];

  return (
    <div className="h-full overflow-y-auto bg-[#050816] px-5 py-6 sm:px-8">
      <div className="mx-auto max-w-4xl">

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
          Activity
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Your recent SumoChat AI activity.
        </p>

        <div className="mt-6 space-y-3">

          {activities.map((activity, index) => (
            <div
              key={index}
              className="
                flex
                items-center
                gap-4
                rounded-2xl
                border
                border-white/10
                bg-[#0b1220]
                p-5
                transition
                hover:border-blue-500/20
              "
            >

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                {activity.icon}
              </div>

              <div className="flex-1">
                <h3 className="font-medium text-white">
                  {activity.title}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {activity.description}
                </p>
              </div>

              <span className="text-xs text-slate-600">
                {activity.time}
              </span>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Activity;