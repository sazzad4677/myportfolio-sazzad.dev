import React from "react";
import Link from "next/link";
import Header from "../component/Header/Header";
import Email from "../component/Socials/Email";
import Socials from "../component/Socials/Socials";

const NoMatchRoute = () => {
  return (
    <div>
      <Header />
      <div className=" flex flex-col items-center justify-center py-12 md:py-24">
        <h1
          className="text- text-center font-mono text-primary"
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
          href="/"
          className="ease-ease-transition mt-[50px] block rounded-[4px] border-2 border-primary px-6 py-4 text-center font-mono leading-[1] text-primary transition-colors duration-300 hover:bg-primaryTint md:px-7 md:py-5"
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
