import React, { useState } from "react";
import Loader from "../component/Loader/Loader";
import About from "../component/About/About";
import Experience from "../component/Experience/Experience";
import Header from "../component/Header/Header";
import Hero from "../component/Hero/Hero";
import Email from "../component/Socials/Email";
import Socials from "../component/Socials/Socials";
import Works from "../component/Works/Works";
import Footer from "../component/Footer/Footer";
import Contact from "../component/Contact/Contact";
import Archive from "../component/Archive/Archive";
import { Helmet } from "react-helmet";

const Home = () => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sazzad</title>
        <link rel="canonical" href="https://sazzad.dev" />
      </Helmet>
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
