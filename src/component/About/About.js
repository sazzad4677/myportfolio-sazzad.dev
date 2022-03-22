import React from "react";
import myImage from "../../images/me.webp";
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
                I'm a knowledgeable and enthusiastic <span className="text-green">Full-Stack Developer</span> who
                puts an emphasis on efficiency and lifelong learning. I am
                respectful and excited about Web Applications and everything
                related to them. I'm interested in web programming, app
                development, and website creation. Working in this industry
                gives me the opportunity to learn new things and get new
                perspectives.
              </p>
              <p className="mt-3 text-xl leading-[1.3] text-slate">
                My goal is to design programs that are both{" "}
                <span className="text-green"> scalable and efficient</span> , as
                well as user experiences that are captivating and pixel-perfect.
              </p>
              <p className="mt-3 text-xl leading-[1.3] text-slate">
                As a result, I'm looking for a company willing to recruit me as
                a developer. In exchange, I pledge to give 100% of my work and
                to be a pleasant and courteous team member. I'm looking for a{" "}
                <span className="text-green">
                  web development job or internship
                </span>{" "}
                right now. I'm always on the lookout for new ways to learn and
                accomplish more.
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
                src={myImage}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
