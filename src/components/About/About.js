import React, { useState, useEffect } from "react";
import { Element } from "react-scroll";
import contentManager from "@/lib/contentManager";

const About = () => {
  const [content, setContent] = useState({
    paragraphs: [],
    skillsHeading: "",
    profileImage: "/images/me.jpg"
  });
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const aboutData = contentManager.getAbout();
    const skillsData = contentManager.getSkills();
    setContent(aboutData);
    setSkills(skillsData);
  }, []);

  return (
    <Element name="about">
      <section id="about" className="min-h-full max-w-[900px] py-12 md:py-24">
        <div className="mt-5 mb-10 flex items-center space-x-4 ">
          <h2
            className={`whitespace-nowrap font-sans text-[clamp(26px,5vw,32px)] font-bold capitalize text-on-background before:mr-2.5 before:font-mono before:text-xl before:text-primary before:content-['01.']`}
          >
            About Me
          </h2>
          <span className="h-px w-52 bg-surface-variant" />
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[3fr,2fr]">
          <div className="space-y-5">
            <div className="space-y-5 font-sans">
              <div>
                {content.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={`text-xl leading-[1.3] text-secondary ${index > 0 ? 'mt-3' : ''}`}
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ))}
              </div>
              <p className="ml-1 mt-5 text-xl text-secondary ">
                {content.skillsHeading}
              </p>
            </div>
            <ul className="ml-1 grid list-inside grid-cols-[repeat(2,minmax(140px,200px))] gap-x-4 gap-y-2  font-mono text-sm tracking-normal text-secondary">
              {skills.map((skill, index) => (
                <li
                  key={skill.id || index}
                  className="list-none before:text-sm before:text-primary before:content-['▹']"
                >
                  <span className="ml-3">{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-auto max-w-[300px] ">
            <div className="group relative cursor-pointer shadow-2xl">
              <div className="absolute top-7 left-7 z-0 h-full w-full rounded-lg border-4 border-primary transition-all duration-200 ease-transition group-hover:top-6 group-hover:left-6 sm:top-9 sm:left-9"></div>
              <div className="relative overflow-hidden rounded-lg bg-primary">
                <img
                  width="500"
                  height="500"
                  className="z-10 mix-blend-multiply grayscale filter transition-all duration-100 ease-transition group-hover:mix-blend-normal group-hover:grayscale-0"
                  src={content.profileImage}
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
