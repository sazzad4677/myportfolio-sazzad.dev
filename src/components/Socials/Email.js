"use client";
import { motion } from "framer-motion";
import React from "react";
const Email = () => {
  return (
    <div className="fixed bottom-0 z-10 hidden flex-col items-center space-y-5 md:right-5 md:flex lg:right-8">
      <div className="scale-90 transform font-mono text-sm leading-[18px] text-secondary transition-transform duration-300 ease-transition hover:scale-100">
        <a
          href="mailto:sazzad4677@gmail.com"
          className="inline-block tracking-widest no-underline antialiased hover:text-primary "
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
        className="h-32 w-[1px] bg-on-background"
      />
    </div>
  );
};

export default Email;
