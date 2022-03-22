// import Link from 'next/link';
import { Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import useScrollPosition from "../../hooks/useScrollPosition";

const Header = () => {
  const scrollPosition = useScrollPosition();
  const isTabletOrMobile = useMediaQuery({ query: "(min-width: 768px)" });

  const [isOpen, setIsOpen] = useState(isTabletOrMobile);

  const navLinks = [
    {
      name: "About",
      url: "/#about",
    },
    {
      name: "Experience",
      url: "/#jobs",
    },
    {
      name: "Work",
      url: "/#projects",
    },
    {
      name: "Contact",
      url: "/#contact",
    },
  ];

  return (
    <header
      className={`z-50 h-auto backdrop-filter backdrop-blur bg-navy absolute flex items-center w-full px-6 md:py-0 md:px-10 ${
        scrollPosition >= 120
          ? "header-active py-4 md:h-16 bg-opacity-80"
          : "md:h-24 py-5"
      }`}
    >
      <nav className="flex flex-col md:flex-row md:items-center justify-center md:justify-between w-full relative">
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
          <Link to="/">
            <div className="text-green w-full h-full transition-all duration-300 ease-in-out tracking-wide">
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
          </Link>
        </motion.div>
        <Transition
          appear={true}
          show={isOpen}
          enter="transition-opacity  duration-500 ease-transition"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500 ease-transition"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="flex flex-col  md:flex-row md:items-center mt-5 md:mt-0"
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
            className="flex flex-col md:flex-row md:items-center md:justify-between list-outside"
          >
            {navLinks.map((link, index) => (
              <Transition.Child
                key={index}
                as="li"
                enter="transition-opacity delay-600 transition-transform duration-500 ease-transition"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity delay-600 transition-transform duration-500 ease-transition"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="md:mx-1 py-3 md:py-0 relative count font-mono text-sm leading-none text-lightestSlate hover:text-green transition-colors duration-300 "
              >
                <a className="p-2.5 count-item " href={link.url}>
                  {link.name}
                </a>
              </Transition.Child>
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
              href="/CV_of_Md_Sazzad_Hossain_Junior_Full_Stack_Developer.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green inline-block leading-none text-sm mt-3.5 md:mt-0 ml-3 font-mono bg-transparent border border-green rounded hover:bg-greenTint py-3 px-4 transition-all duration-300 ease-in-out"
            >
              Resume
            </a>
          </motion.div>
        </Transition>
        <button
          className={`menu-toggle-btn inline-block md:hidden focus:outline-none  absolute top-0 right-0 ${
            isOpen && "menu-toggle-btn-open"
          }`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
