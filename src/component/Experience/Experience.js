import React from "react";
import { Element } from "react-scroll/modules";

const Experience = () => {
  const [tabIndex, setTabIndex] = React.useState(0);

  const jobs = [
    {
      company: "MMHI",
      name: "MyMedical Hub International",
      position: "Software Enginner",
      range: "March 2024 - Present",
      website: "https://mymedicalhub.com/",
      description: [
        {
          item: "Developed and maintained responsive, user-friendly web interfaces for the company’s healthcare platform, improving patient and provider engagement.",
        },
        {
          item: "Collaborated with UX/UI designers to implement modern, accessible designs using HTML, CSS, and JavaScript frameworks.",
        },
        {
          item: "Optimized web applications for performance, ensuring fast load times and seamless functionality across multiple devices and browsers.",
        },
        {
          item: "Integrated frontend components with backend APIs to enable dynamic data display and interactive features.",
        },
        {
          item: "Participated in code reviews and worked closely with the development team to maintain high code quality and adhere to best practices.",
        },
        {
          item: "Troubleshot and resolved frontend bugs and issues promptly, contributing to enhanced user satisfaction.",
        },
        {
          item: "Stayed updated with the latest frontend technologies to continuously improve the application’s interface and user experience.",
        }
      ],
    },
    {
      company: "Buyonia Bangladesh Limited",
      name: "Buyonia",
      position: "Software Engineer",
      range: "April 2022 - March 2024",
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
            className={`whitespace-nowrap font-sans text-[clamp(26px,5vw,32px)] font-bold capitalize text-on-background before:mr-2.5 before:font-mono before:text-xl before:text-primary before:content-['02.']`}
          >
            Where I've worked
          </h2>
          <span className="h-px w-52 bg-surface-variant" />
        </div>
        <div className="flex flex-col space-y-10 overflow-x-auto font-sans md:flex-row md:space-y-0 md:space-x-10">
          <div>
            <div className="flex md:flex-col relative w-max ">
              <div
                className={`tab-indicator absolute md:top-0 bottom-0 left-0 md:w-[2px] h-[2px] md:h-[42px] bg-primary transition-transform duration-200 ease-transition `}
                style={{ transform: `translateY(calc(${tabIndex} * 42px))` }}
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
                  className={`focus:outline-none text-base tracking-[1px] h-[42px] min-w-[150px] w-full pl-8 pr-8 md:pr-14 hover:bg-primary-tint border-b-2 md:border-b-0 md:border-l-2 border-on-surface-variant flex items-center justify-center md:justify-start transition-colors duration-300 font-sans ${tabIndex === index ? "text-primary bg-background" : ""
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
              <span className="text-on-background whitespace-nowrap">
                {job.position}
              </span>
              &nbsp;
              <a
                href={job.website}
                target="_blank"
                className="text-primary break-words"
                rel="noreferrer"
              >
                @ {job.name}
              </a>
            </h3>
            <p className="prose text-secondary">{job.range}</p>
            {job?.description && (
              <ul className="ml-3 mt-5 list-outside tracking-[1px] list-[square]">
                {job?.description.map((list, index) => (
                  <li
                    className="py-2 pl-3 text-on-surface font-light"
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
