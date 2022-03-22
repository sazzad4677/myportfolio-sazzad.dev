import React from "react";
const Works = () => {
  const features = [
    {
      title: "Cutly - Link Shortener",
      description:
        "A web application for shortening long URLs. Here I used a url validator. I didn't use any third-party APIs. Instead, I built my own API with my proper error handling.",
      technologies: ["React", "Express JS", "Tailwind CSS", "Mongoose"],
      links: {
        github: "https://github.com/sazzad4677/cutly-frontend",
        external: "https://cutly.netlify.app/",
      },
      image: { url: "cutly.webp" },
    },
    {
      title: "Interactive Comments Section",
      description:
        "Users can read, add, edit, and delete comments in this project. Comments can be voted up or down by the user. The most popular comments will be displayed first. After the comment, the user can observe how much time has passed.",
      technologies: ["React", "Tailwind CSS"],
      links: {
        github: "https://github.com/sazzad4677/Interactive-comments-section",
        external: "https://interactive-comments-bd.netlify.app/",
      },
      image: {url: "comment.webp" },
    },
    {
      title: "GO Mart",
      description:
        "A grocery delivery system controlled by voice. where the user may utilize voice commands to purchase items. A person with the authority to add, remove, and update products. Voice commands may be used to add items to the cart. Sorting and pagination of the products.",
      technologies: [
        "Mongoose",
        "Express.js",
        "React JS",
        "Tailwind CSS",
        "Redux",
      ],
      links: {
        github: "https://github.com/sazzad4677/GoMart-Frontend",
        external: "https://go-mart.netlify.app/",
      },
      image: { url: "gomart.webp" },
    },
  ];
  return (
    <section id="projects" className="min-h-[75vh] py-12 md:py-24">
      <div className="mt-5 mb-10 flex items-center space-x-4 ">
        <h2
          className={`whitespace-nowrap font-sans text-[clamp(26px,5vw,32px)] font-bold capitalize text-lightestSlate before:mr-2.5 before:font-mono before:text-xl before:text-green before:content-['03.']`}
        >
          Some things I've build
        </h2>
        <span className="h-px w-52 bg-boatswain" />
      </div>
      <ul className="space-y-12 md:space-y-28">
        {features.map((project, index) => (
          <li
            key={index}
            className={`grid grid-cols-12 items-center gap-3 ${
              (index + 1) % 2 === 0 ? "text-left" : "md:text-right"
            }`}
          >
            <div
              className={`relative z-10 col-span-full row-span-full h-full bg-lightNavy opacity-90 md:opacity-100 px-10 py-6 shadow-2xl sm:p-10 md:h-auto md:bg-transparent md:p-0 md:shadow-none ${
                (index + 1) % 2 === 0
                  ? " md:col-start-1 md:col-end-[7] "
                  : " md:col-start-5 md:col-end-[-1] lg:col-start-7 "
              }`}
            >
              <p className="font-regular my-[10px] font-mono text-sm text-green">
                Featured Project
              </p>
              <h3 className="mb-2 text-[clamp(24px,5vw,28px)] font-semibold leading-[1.1] tracking-[1px] text-lightestSlate transition-colors duration-300 ease-transition hover:text-green">
                <a
                  className="static"
                  href={project.links.external || project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.title}
                </a>
              </h3>
              <div className="relative z-10 rounded-sm text-base text-lightSlate md:shadow md:bg-lightNavy md:p-5">
                <p>{project.description}</p>
              </div>
              <ul
                className={`mt-2 flex flex-wrap items-center space-x-5 font-mono text-xs text-green ${
                  (index + 1) % 2 === 0
                    ? "justify-end md:justify-start"
                    : "justify-end"
                }`}
              >
                {project.technologies.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div
                className={`mt-2 flex items-center transition-colors duration-300 ease-transition ${
                  (index + 1) % 2 === 0
                    ? "justify-end md:justify-start"
                    : "justify-end"
                }`}
              >
                {project.links.github && (
                  <a
                    className="p-3 transition-colors duration-300 ease-transition hover:text-green"
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
                    className="p-3 transition-colors duration-300 ease-transition hover:text-green"
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
              </div>
            </div>
            <div
              className={`group relative bg-green transition-all duration-200 ease-transition  ${
                (index + 1) % 2 === 0
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
                    className="w-full h-full object-cover mix-blend-multiply brightness-90 grayscale filter transition-all duration-200 ease-transition group-hover:bg-transparent  group-hover:mix-blend-normal group-hover:grayscale-0 group-hover:filter-none "
                    src={require(`../../images/${project.image.url}`)}
                    alt={`${project.title} Screenshot`}
                  />
                </div>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Works;
