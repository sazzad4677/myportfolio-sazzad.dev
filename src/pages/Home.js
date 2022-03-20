import React, { useState } from "react";
import Loader from "../component/Loader/Loader";
import About from "../component/About/About";
import Experience from "../component/Experience/Experience";
import Header from "../component/Header/Header";
import Hero from "../component/Hero/Hero";
import Email from "../component/Socials/Email";
import Socials from "../component/Socials/Socials";

const Home = () => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading ? (
        <Loader {...{ loading, setLoading }} />
      ) : (
        <>
          <Header />
          <div className="px-[25px] sm:px-[50px] md:px-[100px] lg:px-[150px]">
            <Hero />
            <Socials />
            <Email />
            <About />
            <Experience />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
