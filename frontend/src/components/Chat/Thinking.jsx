import { motion } from "framer-motion";

export default function Thinking() {
  return (
    <div className="flex items-center gap-3 py-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="text-2xl"
      >
        ✨
      </motion.div>

      <span className="text-gray-400 text-lg">
        Thinking...
      </span>

      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-blue-500"
            animate={{
              y: [-4, 4, -4],
            }}
            transition={{
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}