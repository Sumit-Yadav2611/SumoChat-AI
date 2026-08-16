import { motion } from "framer-motion";
import { MdAutoAwesome } from "react-icons/md";

function AIAssistant() {
  return (
    <motion.div
      className="
        pointer-events-none
        fixed
        bottom-28
        right-8
        z-20
        hidden
        lg:block
      "
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Outer glow */}
      <div
        className="
          absolute
          inset-0
          scale-150
          rounded-full
          bg-blue-500/10
          blur-3xl
        "
      />

      {/* Robot container */}
      <div
        className="
          relative
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-[28px]
          border
          border-blue-400/30
          bg-gradient-to-br
          from-[#111a32]
          via-[#15102d]
          to-[#0b1020]
          shadow-[0_0_30px_rgba(59,130,246,0.25)]
        "
      >
        {/* Antenna */}
        <div
          className="
            absolute
            -top-5
            left-1/2
            h-5
            w-px
            -translate-x-1/2
            bg-gradient-to-b
            from-cyan-400
            to-purple-500
          "
        />

        <motion.div
          className="
            absolute
            -top-7
            left-1/2
            h-3
            w-3
            -translate-x-1/2
            rounded-full
            bg-cyan-400
            shadow-[0_0_12px_rgba(34,211,238,0.9)]
          "
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [0.9, 1.15, 0.9],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />

        {/* Robot face */}
        <div
          className="
            relative
            flex
            h-12
            w-14
            items-center
            justify-center
            rounded-2xl
            border
            border-cyan-400/30
            bg-[#080d1a]
            shadow-[inset_0_0_15px_rgba(59,130,246,0.08)]
          "
        >
          {/* Eyes */}
          <div className="flex gap-3">

            <motion.span
              className="
                h-2
                w-2
                rounded-full
                bg-cyan-400
                shadow-[0_0_8px_rgba(34,211,238,0.9)]
              "
              animate={{
                scaleY: [1, 0.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />

            <motion.span
              className="
                h-2
                w-2
                rounded-full
                bg-cyan-400
                shadow-[0_0_8px_rgba(34,211,238,0.9)]
              "
              animate={{
                scaleY: [1, 0.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />

          </div>

          {/* Smile */}
          <div
            className="
              absolute
              bottom-2
              h-1
              w-5
              rounded-full
              bg-gradient-to-r
              from-cyan-400
              to-purple-400
            "
          />
        </div>

        {/* Side lights */}
        <span
          className="
            absolute
            left-1
            top-1/2
            h-2
            w-1
            -translate-y-1/2
            rounded-full
            bg-purple-400
            shadow-[0_0_8px_rgba(168,85,247,0.8)]
          "
        />

        <span
          className="
            absolute
            right-1
            top-1/2
            h-2
            w-1
            -translate-y-1/2
            rounded-full
            bg-cyan-400
            shadow-[0_0_8px_rgba(34,211,238,0.8)]
          "
        />
      </div>

      {/* Small sparkle */}
      <motion.div
        className="
          absolute
          -right-3
          -top-3
          text-purple-400
        "
        animate={{
          rotate: [0, 15, -15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        <MdAutoAwesome size={18} />
      </motion.div>
    </motion.div>
  );
}

export default AIAssistant;