import React from "react";
import { Element } from "react-scroll/modules";

const Experience = () => {
  const [tabIndex, setTabIndex] = React.useState(0);

  const jobs = [
    {
      company: "Buyonia Bangladesh Limited",
      name: "Buyonia",
      position: "Software Engineer",
      range: "April 2022 - Present",
      website: "https://www.buyoniasoft.com/",
      description: [
        {
          item: "I have extensive experience working with a diverse range of platforms, frameworks, and content management systems. These include JavaScript, TypeScript, React, Next.js, Express, and MongoDB. I am adept at leveraging these technologies to deliver high-quality solutions and optimize business operations.",
        },
        {
          item: "Demonstrated success in managing server infrastructure with AWS, leading and motivating teams, and fostering strong relationships with colleagues.",
        },
      ],
    },
    // {
    //   company: "IBBL",
    //   name: "Islami Bank Bangladesh Limited",
    //   position: "Computer Operator",
    //   range: "Sep 2020 - Feb 2021",
    //   website: "https://www.islamibankbd.com/",
    //   description: [
    //     {
    //       item: "Opening / modifying / closing accounts on the system including scanning of signatures duly authorised by competent official.",
    //     },
    //     {
    //       item: "Add / modify / delete records in masters and parameter files jointly with higher authority.",
    //     },
    //     {
    //       item: "Accept, modify and delete standing instructions as per customer's instructions. etc...",
    //     },
    //   ],
    // },
    // {
    //   company: "TechrZ IT",
    //   name: "TechrZ IT",
    //   position: "Web Developer",
    //   range: "May 2017 - Present",
    // },
  ];
  const job = jobs[tabIndex];
  return (
    <Element name="jobs">
      <section
        id="jobs"
        className="max-w-[700px] py-[50px] md:min-h-full md:py-[100px]"
      >
        <div className="mt-5 mb-10 flex items-center space-x-4 ">
          <h2
            className={`whitespace-nowrap font-sans text-[clamp(26px,5vw,32px)] font-bold capitalize text-lightestSlate before:mr-2.5 before:font-mono before:text-xl before:text-green before:content-['02.']`}
          >
            Where I've worked
          </h2>
          <span className="h-px w-52 bg-boatswain" />
        </div>
        <div className="flex flex-col space-y-10 overflow-x-auto font-sans md:flex-row md:space-y-0 md:space-x-10">
          <div>
            // <h1>
            //   I currently do not have any professional experience to mention,
            //   however I have worked on a variety of projects, which you may see
            //   listed below.
            // </h1>
          <div className="flex md:flex-col relative w-max ">
            <div
              className={`tab-indicator absolute md:top-0 bottom-0 left-0 md:w-[2px] h-[2px] md:h-[42px] bg-green transition-transform duration-200 ease-transition `}
              // style={{ transform: `translateY(calc(${tabIndex} * 42px))` }}
            />
            <style jsx>{`
              @media (max-width: 767px) {
                .tab-indicator {
                  min-width: 150px;
                  transform: translateX(calc(${tabIndex}*150px));
                }
              }
              @media (min-width: 768px) {
                .tab-indicator {
                  transform: translateY(calc(${tabIndex}*42px));
                }
              }
            `}</style>
            {jobs.map((job, index) => (
              <button
                key={index}
                className={`focus:outline-none text-base tracking-[1px] h-[42px] min-w-[150px] w-full pl-8 pr-8 md:pr-14 hover:bg-greenTint border-b-2 md:border-b-0 md:border-l-2 border-darkSlate flex items-center justify-center md:justify-start transition-colors duration-300 font-sans ${
                  tabIndex === index ? "text-green bg-navy" : ""
                }`}
                onClick={() => setTabIndex(index)}
              >
                <span>{job.company}</span>
              </button>
            ))}
          </div>
          </div>
          <div>
          <h3 className="text-2xl mb-2 font-semibold flex flex-wrap items-center">
            <span className="text-lightestSlate whitespace-nowrap">
              {job.position}
            </span>
            &nbsp;
            <a
              href={job.website}
              target="_blank"
              className="text-green break-words"
              rel="noreferrer"
            >
              @ {job.name}
            </a>
          </h3>
          <p className="prose text-slate">{job.range}</p>
          {job?.description && (
            <ul className="ml-3 mt-5 list-outside tracking-[1px] list-[square]">
              {job?.description.map((list, index) => (
                <li
                  className="py-2 pl-3 text-lightSlate font-light"
                  key={index}
                >
                  <span>{list.item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        </div>
      </section>
    </Element>
  );
};

export default Experience;
