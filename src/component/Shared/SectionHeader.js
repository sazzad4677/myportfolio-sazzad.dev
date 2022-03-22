import React from "react";

const SectionHeader = ({ sectionId, name }) => {
  console.log(sectionId)
  return (
    <div className="flex items-center space-x-4 mt-5 mb-10 ">
      <h2
        className={`font-bold capitalize text-lightestSlate font-sans before:content-['${sectionId}.'] before:text-xl before:text-green before:font-mono before:mr-2.5 whitespace-nowrap text-[clamp(26px,5vw,32px)]`}
      >
        {name}
      </h2>
      <span className="w-52 h-px bg-boatswain" />
    </div>
  );
};

export default SectionHeader;
