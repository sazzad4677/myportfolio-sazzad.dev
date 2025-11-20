"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import useScrollPosition from "../../hooks/useScrollPosition";
// import { Link as ReactScrollLink } from "react-scroll";

const Header = () => {
  const scrollPosition = useScrollPosition();
  const isTabletOrMobile = useMediaQuery({ query: "(min-width: 768px)" });

  const [isOpen, setIsOpen] = useState(isTabletOrMobile);

  const navLinks = [
    {
      name: "About",
      url: "about",
    },
    {
      name: "Experience",
      url: "jobs",
    },
    {
      name: "Work",
      url: "projects",
    },
    {
      name: "Contact",
      url: "contact",
    },
  ];

  return (
    <header
      className={`absolute z-50 flex h-auto w-full items-center bg-navy px-6 backdrop-blur backdrop-filter md:py-0 md:px-10 ${scrollPosition >= 120
        ? "header-active bg-opacity-80 py-4 md:h-16"
        : "py-5 md:h-24"
        }`}
    >
      <nav className="relative flex w-full flex-col justify-center md:flex-row md:items-center md:justify-between">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
          className="w-8 md:w-11"
        >
          {/* Logo */}
          <a
            className="cursor-pointer"
            href="#home"
          >
            <div className="h-full w-full tracking-wide text-green transition-all duration-300 ease-in-out">
              <svg
                id="logo"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                viewBox="0 0 84 96"
                fill="none"
              >
                <title>Logo</title>
                <g>
                  <polygon
                    id="Shape"
                    stroke="currentColor"
                    strokeWidth="5"
                    points="42,3 3,25 3,70 42,93 81,71 81,26 "
                  />
                </g>
                <text
                  x="29"
                  y="64"
                  fill="currentColor"
                  fontSize="50px"
                  fontFamily="font-mono"
                >
                  S
                </text>
              </svg>
            </div>
          </a>
        </motion.div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="mt-5 flex flex-col md:mt-0 md:flex-row md:items-center"
            >
              <motion.ol
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeInOut",
                  },
                }}
                className="flex list-outside flex-col md:flex-row md:items-center md:justify-between"
              >
                {navLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="count relative py-3 font-mono text-sm leading-none text-lightestSlate transition-colors duration-300 hover:text-green md:mx-1 md:py-0 "
                  >
                    <a
                      className="count-item cursor-pointer p-2.5"
                      href={`#${link.url}`}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </motion.ol>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeInOut",
                  },
                }}
              >
                <a
                  href="https://drive.google.com/file/d/1ffycRhonZegQk2VJjfsa_g_AZAOj_5Xw/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3.5 ml-3 inline-block rounded border border-green bg-transparent py-3 px-4 font-mono text-sm leading-none text-green transition-all duration-300 ease-in-out hover:bg-greenTint md:mt-0"
                >
                  Resume
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          className={`menu-toggle-btn absolute top-0 right-0  inline-block focus:outline-none md:hidden ${isOpen && "menu-toggle-btn-open"
            }`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header >
  );
};

export default Header;
