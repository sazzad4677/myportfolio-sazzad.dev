import React from "react";
import SectionHeader from "../Shared/SectionHeader";

const About = () => {
  const skills = [
    { name: "HTML & (S)CSS" },
    { name: "JavaScript (ES6+)" },
    { name: "Bootstrap" },
    { name: "Tailwind CSS" },
    { name: "React & Redux" },
    { name: "React Native" },
    { name: "Electron" },
    { name: "Node.js" },
    { name: "Express.js" },
    { name: "MongoDB" },
  ];
  return (
    <section id="about" className="min-h-full max-w-[900px] py-12 md:py-24">
      <SectionHeader sectionId={"01"}name="About Me" />
      <div className="grid gap-10 grid-cols-1 md:grid-cols-[3fr,2fr]">
        <div className="space-y-5">
          <div className="space-y-5 font-sans">
            <p className="text-xl text-slate leading-[1.3]">
              Hello! I'm Sazzad, a passionate self-taught Full Stack developer
              from Bangladesh. I build things for the web & mobile.
              <br />I develop
              <span className="text-green">web applications,</span> mobile
              applications & desktop applications. Passionate about new
              technologies and problem-solving. I am available for any kind of
              job opportunity that suits my interests
            </p>
            <p className="ml-1 mt-5 text-xl text-slate ">
              Here are a few technologies I've been working with recently:
            </p>
          </div>
          <ul className="ml-1 font-mono text-sm text-slate list-inside tracking-normal  grid gap-x-4 gap-y-2 grid-cols-[repeat(2,minmax(140px,200px))]">
            {skills.map((skill, index) => (
              <li
                key={index}
                className="before:content-['▹'] list-none before:text-green before:text-sm"
              >
                <span className="ml-3">{skill.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="max-w-[300px] mx-auto ">
          <div className="relative shadow-2xl group cursor-pointer">
            <div className="z-0 rounded-lg absolute w-full h-full top-7 sm:top-9 left-7 sm:left-9 border-4 border-green group-hover:top-6 group-hover:left-6 transition-all duration-200 ease-transition"></div>
            <div className="rounded-lg overflow-hidden bg-green relative">
              <img
                className="z-10 filter transition-all duration-100 ease-transition grayscale mix-blend-multiply hover:grayscale-0 hover:mix-blend-normal"
                src="https://scontent.fdac142-1.fna.fbcdn.net/v/t1.6435-9/97989063_1616738725146489_5845549265513873408_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeEnL6nYGoSvKtlxDNlxzFq17e4SuL_7LTrt7hK4v_stOnqNDuuf9s-_M0iQhkSqO5we4qvU_WJQAfcDc_UiV5Gi&_nc_ohc=KzyKp6CBBYQAX-8W4T4&_nc_ht=scontent.fdac142-1.fna&oh=00_AT9HbYC-sgQEk0DsF68jVZ5GAWh6kZjopUgHGhZevtjbeQ&oe=625B0347"
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
