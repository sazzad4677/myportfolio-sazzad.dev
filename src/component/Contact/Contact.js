import React from "react";
import { Element } from "react-scroll";
const Contact = () => {
  return (
    <Element name="contact">
      <section id="contact" className="py-[100px] md:min-h-[75vh]">
        <div className="mt-5 mb-10 flex items-center justify-center space-x-4">
          <p className="font-mono text-[18px] text-green">04.</p>
          <h3 className="whitespace-nowrap font-mono text-[18px] capitalize text-green">
            What’s Next?
          </h3>
        </div>
        <div className="text-center">
          <h1 className="text-[clamp(40px,5vw,60px)] font-semibold leading-[1.1] tracking-[1px]">
            Get In Touch
          </h1>
          <p className="prose prose-lg mx-auto pt-5 text-lightSlate">
            I'd like to work for any company that believes my skills will be
            helpful to them. Please let me know if you're seeking for someone
            similar to me. You can just simply 'say hello' and I'll do my best
            to respond!
          </p>
        </div>
        <div className="mt-[55px] flex items-center justify-center">
          <a
            href={`mailto:sazzadhossain724@gmail.com`}
            className="ease-ease-transition rounded-[4px] border-2 border-green px-6 py-3 font-mono leading-[1] text-green transition-colors duration-300 hover:bg-greenTint md:px-7 md:py-4"
          >
            Say Hello
          </a>
        </div>
      </section>
    </Element>
  );
};

export default Contact;
