"use client";
import React, { useState } from "react";
import Loader from "../components/Loader/Loader";
import About from "../components/About/About";
import Experience from "../components/Experience/Experience";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Email from "../components/Socials/Email";
import Socials from "../components/Socials/Socials";
import Works from "../components/Works/Works";
import Footer from "../components/Footer/Footer";
import Contact from "../components/Contact/Contact";
import Archive from "../components/Archive/Archive";


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
            <Works />
            <Archive />
            <Contact />
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
