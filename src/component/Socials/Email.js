import React from "react";
import { motion } from "framer-motion";
const Email = () => {
  return (
    <div className="hidden fixed bottom-0 md:right-5 lg:right-8 z-10 md:flex flex-col items-center space-y-5">
      <div className="font-mono text-sm leading-[18px] text-slate transform scale-90 hover:scale-100 transition-transform duration-300 ease-transition">
        <a
          href="mailto:sazzad4677@gmail.com"
          className="inline-block no-underline antialiased hover:text-green tracking-widest "
          target="_blank"
          rel="noopener noreferrer"
          style={{
            writingMode: " vertical-rl",
          }}
        >
          sazzad4677@gmail.com
        </a>
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { ease: "easeInOut", duration: 0.5, delay: 0.1 },
        }}
        className="w-[1px] h-32 bg-lightestSlate"
      />
    </div>
  );
};

export default Email;
