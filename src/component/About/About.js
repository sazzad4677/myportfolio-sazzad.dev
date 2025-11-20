import React from "react";

import { Element } from "react-scroll";
const About = () => {
  const skills = [
    { name: "HTML & CSS" },
    { name: "JavaScript (ES6+)" },
    { name: "Bootstrap" },
    { name: "Tailwind CSS" },
    { name: "React & Redux" },
    { name: "Node.js" },
    { name: "MongoDB" },
    { name: "Express.js" },
    { name: "Mongoose" },
  ];
  return (
    <Element name="about">
      <section id="about" className="min-h-full max-w-[900px] py-12 md:py-24">
        <div className="mt-5 mb-10 flex items-center space-x-4 ">
          <h2
            className={`whitespace-nowrap font-sans text-[clamp(26px,5vw,32px)] font-bold capitalize text-lightestSlate before:mr-2.5 before:font-mono before:text-xl before:text-green before:content-['01.']`}
          >
            About Me
          </h2>
          <span className="h-px w-52 bg-boatswain" />
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[3fr,2fr]">
          <div className="space-y-5">
            <div className="space-y-5 font-sans">
              <div>
                <p className="text-xl leading-[1.3] text-slate">
                  I'm a passionate <span className="text-green">Full-Stack Developer</span> focused on efficiency and continuous learning. I specialize in web applications, app development, and website creation.
                </p>
                <p className="mt-3 text-xl leading-[1.3] text-slate">
                  My goal is to create <span className="text-green">scalable, efficient</span> programs and engaging, pixel-perfect user experiences.
                </p>
                <p className="mt-3 text-xl leading-[1.3] text-slate">
                  I'm currently seeking a <span className="text-green">web development job </span> and am eager to contribute as a dedicated, positive team member.
                </p>
              </div>
              <p className="ml-1 mt-5 text-xl text-slate ">
                Here are a few technologies I've been working with recently:
              </p>
            </div>
            <ul className="ml-1 grid list-inside grid-cols-[repeat(2,minmax(140px,200px))] gap-x-4 gap-y-2  font-mono text-sm tracking-normal text-slate">
              {skills.map((skill, index) => (
                <li
                  key={index}
                  className="list-none before:text-sm before:text-green before:content-['▹']"
                >
                  <span className="ml-3">{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-auto max-w-[300px] ">
            <div className="group relative cursor-pointer shadow-2xl">
              <div className="absolute top-7 left-7 z-0 h-full w-full rounded-lg border-4 border-green transition-all duration-200 ease-transition group-hover:top-6 group-hover:left-6 sm:top-9 sm:left-9"></div>
              <div className="relative overflow-hidden rounded-lg bg-green">
                <img
                  width="500"
                  height="500"
                  className="z-10 mix-blend-multiply grayscale filter transition-all duration-100 ease-transition  group-hover:mix-blend-normal group-hover:grayscale-0"
                  src="/images/me.webp"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default About;
