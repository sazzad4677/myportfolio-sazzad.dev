import React, { useState, useEffect } from "react";
import { Element } from "react-scroll/modules";
import contentManager from "@/lib/contentManager";

const Works = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const projectsData = contentManager.getProjects();
    setFeatures(projectsData);
  }, []);

  return (
    <Element name="projects">
      <section className="min-h-[75vh] py-12 md:py-24">
        <div className="mt-5 mb-10 flex items-center space-x-4 ">
          <h2
            className={`whitespace-nowrap font-sans text-[clamp(26px,5vw,32px)] font-bold capitalize text-on-background before:mr-2.5 before:font-mono before:text-xl before:text-primary before:content-['03.']`}
          >
            Some things I've build
          </h2>
          <span className="h-px w-52 bg-surface-variant" />
        </div>
        <ul className="space-y-12 md:space-y-28 ">
          {features.map((project, index) => (
            <li
              key={project.id || index}
              className={`grid grid-cols-12 items-center gap-3 group ${(index + 1) % 2 === 0 ? "text-left" : "md:text-right"
                }`}
            >
              <div
                className={`relative z-10 col-span-full row-span-full h-full bg-background px-10 py-6 opacity-90 shadow-2xl sm:p-10 md:h-auto md:bg-transparent md:p-0 md:opacity-100 md:shadow-none ${(index + 1) % 2 === 0
                  ? " md:col-start-1 md:col-end-[7] "
                  : " md:col-start-5 md:col-end-[-1] lg:col-start-7 "
                  }`}
              >
                <p className="font-regular my-[10px] font-mono text-sm text-primary">
                  Featured Project
                </p>
                <h3 className="mb-2 text-[clamp(24px,5vw,28px)] font-semibold leading-[1.1] tracking-[1px] text-on-background transition-colors duration-300 ease-transition hover:text-primary">
                  <a
                    className="static"
                    href={project.links.external || project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.title}
                  </a>
                </h3>
                <div className="relative z-10 rounded-sm text-base text-foreground md:bg-background md:p-5 md:shadow">
                  <p>{project.description}</p>
                </div>
                <ul
                  className={`mt-2 flex flex-wrap items-center space-x-5 font-mono text-xs text-primary ${(index + 1) % 2 === 0
                    ? "justify-end md:justify-start"
                    : "justify-end"
                    }`}
                >
                  {project.technologies.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <div
                  className={`mt-2 flex items-center transition-colors duration-300 ease-transition ${(index + 1) % 2 === 0
                    ? "justify-end md:justify-start"
                    : "justify-end"
                    }`}
                >
                  {project.links.github && (
                    <a
                      className="p-3 transition-colors duration-300 ease-transition hover:text-primary"
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <title>GitHub</title>
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                  )}
                  {project.links.external && (
                    <a
                      className="p-3 transition-colors duration-300 ease-transition hover:text-primary"
                      href={project.links.external}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <title>External Link</title>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  )}
                  {project.links.admin && (
                    <a
                      className="p-3 transition-colors duration-300 ease-transition hover:text-primary"
                      href={project.links.admin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <title>Admin Panel</title>
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="9" y1="21" x2="9" y2="9"></line>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
              <div
                className={`relative bg-primary transition-all duration-200 ease-transition  ${(index + 1) % 2 === 0
                  ? "col-span-full row-span-full md:col-start-6 md:col-end-[-1] "
                  : "col-span-full row-span-full md:col-start-1 md:col-end-8 "
                  }
              `}
              >
                <a
                  href={project.links.external}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    <img
                      className="h-full w-full object-cover mix-blend-multiply brightness-90 grayscale filter transition-all duration-200 ease-transition group-hover:bg-transparent  group-hover:mix-blend-normal group-hover:grayscale-0 group-hover:filter-none "
                      src={`/images/${project.image.url}`}
                      alt={`${project.title} Screenshot`}
                    />
                  </div>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Element>
  );
};

export default Works;
