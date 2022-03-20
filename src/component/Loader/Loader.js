import { AnimatePresence, motion } from "framer-motion";

const Loader = ({ setLoading }) => {
  const svgVariants = {
    hidden: {
      opacity: 1,
    },
    visible: {
      opacity: 0,
      scale: 0.8,
      transition: { delay: 2, duration: 0.3, ease: "easeInOut" },
    },
  };

  const pathVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };
  const textVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 1,
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        className="bg-libertyBlue w-full h-screen flex items-center justify-center fixed inset-0 z-[99]"
      >
        <div className="w-32 h-32 text-green">
          <motion.svg
            variants={svgVariants}
            initial="hidden"
            animate="visible"
            onAnimationComplete={() => setLoading(false)}
            id="logo"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            viewBox="0 0 100 100"
            fill="none"
          >
            <title>Logo</title>

            <motion.path
              variants={pathVariants}
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M 50, 5
                  L 11, 27
                  L 11, 72
                  L 50, 95
                  L 89, 73
                  L 89, 28 z"
            />
            <g>
              <motion.path
                variants={textVariants}
                id="eEOMqLXQADV4"
                d="M 50, 5
                L 11, 27
                L 11, 72
                L 50, 95
                L 89, 73
                L 89, 28 z"
                transform="matrix(1 0 0 1 8 2)"
                fill="none"
                stroke="none"
                stroke-width="5"
              />
            </g>
            <text
              x="50%"
              y="55"
              fill="currentColor"
              fontSize="55px"
              fontFamily="font-mono"
              dominant-baseline="middle"
              text-anchor="middle"
            >
              S
            </text>
          </motion.svg>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader;
