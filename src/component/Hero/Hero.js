import { motion } from "framer-motion";
import React from "react";

const Hero = () => {
  const container = {
    animate: {
      transition: { delayChildren: 0.3, staggerChildren: 0.1 },
    },
  };

  const item = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.section
      variants={container}
      initial="initial"
      animate="animate"
      className="min-h-screen flex flex-col justify-center items-start relative overflow-hidden"
    >
      <motion.div variants={item}>
        <h1 className="text-green font-mono text-lg tracking-tight mb-[8px] ml-[4px]">
          Hi, my name is
        </h1>
      </motion.div>
      <motion.div variants={item}>
        <h2
          className="leading-[1.1] tracking-tight text-lightestSlate font-sans font-semibold"
          style={{ fontSize: "clamp(40px, 8vw, 80px)" }}
        >
          Sa<span className="tracking-wide">zz</span>ad Hossain.
        </h2>
      </motion.div>
      <motion.div variants={item}>
        <h1
          className="leading-[1.1] tracking-[-0.06em] text-slate font-sans font-semibold"
          style={{ fontSize: "clamp(40px, 8vw, 80px)" }}
        >
          I build things for the web.
        </h1>
      </motion.div>
      <motion.div variants={item}>
        <p className="max-w-[550px] ml-1 mt-5 prose prose-lg text-lightSlate">
          A passionate self-taught Full Stack developer from Bangladesh. <br />I
          develop web applications, mobile applications and desktop applications
        </p>
      </motion.div>
      <motion.div variants={item}>
        <a
          href={`mailto:sazzad4677@gmail.com`}
          className="px-6 py-4 md:px-7 md:py-5 border-2 border-green text-green mt-[50px] block font-mono leading-[1] rounded-[4px] hover:bg-greenTint transition-colors duration-300 ease-ease-transition"
        >
          Get In Touch
        </a>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
