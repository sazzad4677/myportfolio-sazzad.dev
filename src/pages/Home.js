import React from "react";
import Header from "../component/Header/Header";
import Hero from "../component/Hero/Hero";
import Email from "../component/Socials/Email";
import Socials from "../component/Socials/Socials";

const Home = () => {
  return (
    <>
      <Header />
      <div className="px-[25px] sm:px-[50px] md:px-[100px] lg:px-[150px]">
        <Hero />
        <Socials />
        <Email />
      </div>
    </>
  );
};

export default Home;
