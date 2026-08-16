import { motion } from "framer-motion";

function ChatRobot({ size = "normal" }) {
  const large = size === "large";

  return (
    <motion.div
      animate={{
        y: [0, -6, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`relative ${
        large ? "h-32 w-32" : "h-24 w-24"
      }`}
    >
      {/* =====================================================
          OUTER GLOW
      ===================================================== */}

      <div
        className="
          absolute
          inset-[-20px]
          rounded-full
          bg-cyan-500/10
          blur-2xl
        "
      />

      <div
        className="
          absolute
          inset-[-10px]
          rounded-full
          bg-purple-500/10
          blur-xl
        "
      />

      {/* =====================================================
          ROBOT BODY
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          rounded-[35%]
          border
          border-cyan-400/30
          bg-gradient-to-br
          from-[#111b32]
          via-[#10182b]
          to-[#080d19]
          shadow-[0_0_35px_rgba(34,211,238,0.18)]
        "
      />

      {/* =====================================================
          HEAD
      ===================================================== */}

      <div
        className="
          absolute
          left-1/2
          top-[18%]
          h-[55%]
          w-[68%]
          -translate-x-1/2
          rounded-[28%]
          border
          border-cyan-400/40
          bg-gradient-to-br
          from-[#1d2943]
          via-[#111a2d]
          to-[#090f1d]
          shadow-[inset_0_0_18px_rgba(59,130,246,0.12)]
        "
      >

        {/* Face */}

        <div
          className="
            absolute
            left-1/2
            top-1/2
            flex
            h-[45%]
            w-[65%]
            -translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
            gap-3
            rounded-xl
            border
            border-cyan-400/20
            bg-[#050a14]
          "
        >

          {/* Left eye */}

          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="
              h-2
              w-2
              rounded-full
              bg-cyan-400
              shadow-[0_0_10px_rgba(34,211,238,0.9)]
            "
          />

          {/* Mouth */}

          <motion.div
            animate={{
              scaleX: [1, 0.7, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
            }}
            className="
              h-1
              w-5
              rounded-full
              bg-purple-400
              shadow-[0_0_10px_rgba(168,85,247,0.8)]
            "
          />

          {/* Right eye */}

          <motion.div
            animate={{
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="
              h-2
              w-2
              rounded-full
              bg-cyan-400
              shadow-[0_0_10px_rgba(34,211,238,0.9)]
            "
          />

        </div>

      </div>

      {/* =====================================================
          LEFT ANTENNA
      ===================================================== */}

      <div
        className="
          absolute
          left-[12%]
          top-[36%]
          h-[28%]
          w-[3px]
          rounded-full
          bg-cyan-400/50
        "
      />

      <motion.div
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
        }}
        className="
          absolute
          left-[6%]
          top-[28%]
          h-3
          w-3
          rounded-full
          bg-cyan-400
          shadow-[0_0_12px_rgba(34,211,238,0.9)]
        "
      />

      {/* =====================================================
          RIGHT ANTENNA
      ===================================================== */}

      <div
        className="
          absolute
          right-[12%]
          top-[36%]
          h-[28%]
          w-[3px]
          rounded-full
          bg-purple-400/50
        "
      />

      <motion.div
        animate={{
          opacity: [1, 0.4, 1],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
        }}
        className="
          absolute
          right-[6%]
          top-[28%]
          h-3
          w-3
          rounded-full
          bg-purple-400
          shadow-[0_0_12px_rgba(168,85,247,0.9)]
        "
      />

      {/* =====================================================
          BODY LIGHT
      ===================================================== */}

      <div
        className="
          absolute
          bottom-[10%]
          left-1/2
          h-[5px]
          w-[40%]
          -translate-x-1/2
          rounded-full
          bg-gradient-to-r
          from-cyan-400
          via-blue-400
          to-purple-500
          opacity-70
          blur-[1px]
        "
      />

    </motion.div>
  );
}

export default ChatRobot;