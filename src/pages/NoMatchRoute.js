import React from "react";
import { Link } from "react-router-dom";
import Header from "../component/Header/Header";
import Email from "../component/Socials/Email";
import Socials from "../component/Socials/Socials";
import { Helmet } from "react-helmet";

const NoMatchRoute = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Page Not Found - Sazzad</title>
        <link rel="canonical" href="https://sazzad.dev" />
      </Helmet>
      <Header />
      <div className=" flex flex-col items-center justify-center py-12 md:py-24">
        <h1
          className="text- text-center font-mono text-green"
          style={{ fontSize: "clamp(100px, 25vw, 200px)" }}
        >
          404
        </h1>
        <p
          className="text-center"
          style={{ fontSize: "clamp(30px, 5vw, 50px)", fontWeight: "400" }}
        >
          Page Not Found
        </p>
        <Link
          to="/"
          className="ease-ease-transition mt-[50px] block rounded-[4px] border-2 border-green px-6 py-4 text-center font-mono leading-[1] text-green transition-colors duration-300 hover:bg-greenTint md:px-7 md:py-5"
        >
          Go back Home
        </Link>
      </div>
      <Socials />
      <Email />
    </div>
  );
};

export default NoMatchRoute;
