import React, { useState, useEffect } from "react";
import { Element } from "react-scroll";
import contentManager from "@/lib/contentManager";

const Contact = () => {
  const [content, setContent] = useState({
    preHeading: "What's Next?",
    heading: "Get In Touch",
    description: "",
    email: "sazzad4677@gmail.com",
    ctaText: "Say Hello"
  });

  useEffect(() => {
    const contactData = contentManager.getContact();
    setContent(contactData);
  }, []);

  return (
    <Element name="contact">
      <section id="contact" className="py-[100px] md:min-h-[75vh]">
        <div className="mt-5 mb-10 flex items-center justify-center space-x-4">
          <p className="font-mono text-[18px] text-primary">04.</p>
          <h3 className="whitespace-nowrap font-mono text-[18px] capitalize text-primary">
            {content.preHeading}
          </h3>
        </div>
        <div className="text-center">
          <h1 className="text-[clamp(40px,5vw,60px)] font-semibold leading-[1.1] tracking-[1px]">
            {content.heading}
          </h1>
          <p className="prose prose-lg mx-auto pt-5 text-on-surface">
            {content.description}
          </p>
        </div>
        <div className="mt-[55px] flex items-center justify-center">
          <a
            href={`mailto:${content.email}`}
            className="ease-ease-transition rounded-[4px] border-2 border-primary px-6 py-3 font-mono leading-[1] text-primary transition-colors duration-300 hover:bg-primaryTint md:px-7 md:py-4"
          >
            {content.ctaText}
          </a>
        </div>
      </section>
    </Element>
  );
};

export default Contact;
