import React from "react";

const Archive = () => {
  const archive = [
    {
      title: "Fency Slider",
      description:
        "I made a slider where the user may search the images and make a slider out of the ones they like. The timing of slider changes can be set by the user. For the image search, I used Pixabay.",
      technologies: ["Html", "CSS", "Javascript", "API"],
      links: {
        github: "https://github.com/sazzad4677/fency-slider",
        liveLink: "https://sazzad4677.github.io/fency-slider/",
      },
    },
    {
      title: "Guess The number",
      description:
        "This is a simple dom manipulation project. The user must guess the hidden number in this project. I didn't utilize any JS frameworks in this project. Javascript in its purest form.",
      technologies: ["Html", "CSS", "Javascript"],
      links: {
        github:
          "https://github.com/sazzad4677/few-vanilla-javascript-projects#guess-the-number",
        liveLink: "https://try-guess-the-number.netlify.app/",
      },
    },
    {
      title: "Dice Game",
      description: `A simple javascript dice game in which two players can roll the dice. Please see the github for the rules. I also avoided utilizing any JS frameworks in this project. Javascript in its most basic form.`,
      technologies: ["Html", "CSS", "Javascript"],
      links: {
        github:
          "https://github.com/sazzad4677/few-vanilla-javascript-projects#dice-game",
        liveLink: "https://dice-game-25.netlify.app/",
      },
    },
    {
      title: "Cooking Master",
      description:
        "I developed a Simple API Search feature. User can utilize the meal db api to search for a meal. I didn't use any JS framework here, as I did before.",
      technologies: ["Html", "CSS", "Javascript", "API"],
      links: {
        github: "https://github.com/sazzad4677/cooking-master",
        liveLink: "https://sazzad4677.github.io/cooking-master/",
      },
    },
    {
      title: "Simple Bank Management",
      description:
        "In this project, I solely used html, CSS and Pure Javascript. It's a very simple dom manipulation project",
      technologies: ["Html", "CSS", "Javascript"],
      links: {
        github: "https://github.com/sazzad4677/simple-bank-management",
        liveLink: "https://sazzad4677.github.io/simple-bank-management/",
      },
    },
    {
      title: "Omni Food",
      description:
        "In this project, I solely used html and CSS to develop a landing page. There is no HTML or CSS framework used in this page.",
      technologies: ["Html", "CSS"],
      links: {
        github: "https://github.com/sazzad4677/Omni-Food",
        liveLink: "https://omnifood-1234.netlify.app/",
      },
    },
  ];
  return (
    <section className="min-h-[75vh] py-12 md:py-24">
      <div className="mt-5 mb-10">
        <h2 className="whitespace-nowrap text-center font-sans text-[clamp(26px,5vw,32px)] font-bold capitalize text-lightestSlate">
          Other Noteworthy Projects
        </h2>
      </div>
      <ul className="relative grid list-none grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-3 ">
        {archive.map((project, index) => (
          <li key={index} className="relative">
            <div className="relative flex h-full flex-col items-start justify-between rounded bg-lightNavy px-[2rem] py-[1.75rem]  shadow-[0_10px_30px_-15px] shadow-navyShadow ">
              <header>
                <div class="mb-[35px] flex items-center justify-between ">
                  <div class="h-10 w-10 text-green">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-folder"
                    >
                      <title>Folder</title>
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <div class="flex ">
                    <a
                      href={project.links.github}
                      aria-label="External Link"
                      class="mr-2.5 h-5 w-5 text-lightSlate hover:text-green"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-github"
                      >
                        <title>GitHub</title>
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                    <a
                      href={project.links.liveLink}
                      aria-label="External Link"
                      class="h-5 w-5 text-lightSlate hover:text-green"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-external-link"
                      >
                        <title>External Link</title>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </div>
                </div>
                <h3 class="mb-3 font-sans text-[22px] font-semibold leading-6 tracking-wide text-lightestSlate hover:text-green">
                  <a
                    href={project.links.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="static"
                  >
                    {project.title}
                  </a>
                </h3>
                <div class="text-[17px] leading-6 text-lightSlate">
                  <p>{project.description}</p>
                </div>
              </header>
              <footer>
                <ul class="mt-5 flex flex-grow list-none flex-wrap items-end gap-2 p-0 leading-3">
                  {project.technologies.map((technology, index) => (
                    <li key={index} className="break-all">
                      {technology}
                    </li>
                  ))}
                </ul>
              </footer>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Archive;
