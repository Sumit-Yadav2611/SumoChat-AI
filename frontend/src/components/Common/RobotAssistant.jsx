import { motion } from "framer-motion";

function RobotAssistant() {
  return (
    <motion.div
      className="
        fixed
        bottom-8
        right-8
        z-40
        hidden
        md:block
      "
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Glow */}
      <div
        className="
          absolute
          inset-0
          rounded-full
          bg-cyan-400/20
          blur-3xl
          scale-150
        "
      />

      {/* Robot */}
      <div className="relative h-28 w-28">

        {/* Antenna */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          <div
            className="
              h-5
              w-5
              rounded-full
              bg-cyan-300
              shadow-[0_0_15px_rgba(34,211,238,0.9)]
            "
          />

          <div className="mx-auto h-5 w-[2px] bg-cyan-400" />
        </div>

        {/* Head */}
        <div
          className="
            absolute
            left-1/2
            top-6
            h-20
            w-24
            -translate-x-1/2
            rounded-[28px]
            border
            border-cyan-400/40
            bg-gradient-to-br
            from-[#18243d]
            via-[#0d1528]
            to-[#080d1c]
            shadow-[0_0_25px_rgba(34,211,238,0.25)]
          "
        >

          {/* Face */}
          <div
            className="
              absolute
              left-1/2
              top-1/2
              flex
              h-12
              w-16
              -translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              gap-4
              rounded-2xl
              border
              border-cyan-400/20
              bg-[#050816]
              shadow-inner
            "
          >

            {/* Eyes */}
            <div
              className="
                h-2.5
                w-2.5
                rounded-full
                bg-cyan-300
                shadow-[0_0_10px_rgba(34,211,238,1)]
              "
            />

            <div
              className="
                h-2.5
                w-2.5
                rounded-full
                bg-cyan-300
                shadow-[0_0_10px_rgba(34,211,238,1)]
              "
            />

          </div>

          {/* Left ear */}
          <div
            className="
              absolute
              -left-2
              top-8
              h-7
              w-2
              rounded-full
              bg-purple-500
              shadow-[0_0_10px_rgba(168,85,247,0.8)]
            "
          />

          {/* Right ear */}
          <div
            className="
              absolute
              -right-2
              top-8
              h-7
              w-2
              rounded-full
              bg-cyan-400
              shadow-[0_0_10px_rgba(34,211,238,0.8)]
            "
          />

        </div>

        {/* Bottom glow */}
        <div
          className="
            absolute
            bottom-0
            left-1/2
            h-2
            w-20
            -translate-x-1/2
            rounded-full
            bg-gradient-to-r
            from-cyan-400
            via-purple-500
            to-pink-500
            blur-md
          "
        />

      </div>
    </motion.div>
  );
}

export default RobotAssistant;