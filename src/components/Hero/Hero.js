import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Element } from "react-scroll/modules";
import contentManager from "@/lib/contentManager";

const Hero = () => {
  const [content, setContent] = useState({
    greeting: "Hi, my name is",
    name: "Sazzad Hossain.",
    tagline: "I build things for the web.",
    description: "A self-motivated and enthusiastic full stack developer with a deep interest in JavaScript.",
    ctaText: "Get In Touch",
    ctaLink: "mailto:sazzad4677@gmail.com"
  });

  useEffect(() => {
    const heroData = contentManager.getHero();
    setContent(heroData);
  }, []);

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
    <Element name="home">
      <motion.section
        variants={container}
        initial="initial"
        animate="animate"
        className="relative flex min-h-screen flex-col items-start justify-center overflow-hidden"
      >
        <motion.div variants={item}>
          <h1 className="mb-[8px] ml-[4px] font-mono text-base tracking-tight text-primary ">
            {content.greeting}
          </h1>
        </motion.div>
        <motion.div variants={item}>
          <h2
            className="font-mono font-semibold tracking-tighter text-on-background "
            style={{ fontSize: "clamp(40px, 8vw, 80px)" }}
          >
            {content.name}
          </h2>
        </motion.div>
        <motion.div variants={item}>
          <h1
            className="font-sans font-semibold leading-[1.1] text-secondary"
            style={{ fontSize: "clamp(40px, 8vw, 80px)" }}
          >
            {content.tagline}
          </h1>
        </motion.div>
        <motion.div variants={item}>
          <p className="ml-1 mt-5 max-w-[550px] text-xl leading-[1.3] text-secondary">
            {content.description}
          </p>
        </motion.div>
        <motion.div variants={item}>
          <a
            href={content.ctaLink}
            className="ease-ease-transition mt-[50px] block rounded-[4px] border-2 border-primary px-6 py-4 font-mono leading-[1] text-primary transition-colors duration-300 hover:bg-primary-tint md:px-7 md:py-5"
          >
            {content.ctaText}
          </a>
        </motion.div>
      </motion.section>
    </Element>
  );
};

export default Hero;
