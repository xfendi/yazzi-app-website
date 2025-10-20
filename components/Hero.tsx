import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section
      data-aos="fade-up"
      className="bg-(--color-primary-opacity) rounded-[25px] border-2 border-(--color-primary-dark) !p-[25px] md:!p-[50px] "
      id="features"
    >
      <div className="flex-1 flex flex-col gap-10 items-start text-start">
        <div className="text-4xl md:text-6xl font-bold max-w-5xl">
          Your friends current playing spotify tracks
        </div>
        <div className="!text-stone-200 text-md w-2/3 max-w-screen">
          Add your friends by code or username and add them to widget or see
          their current playing track directly on app feed.
        </div>
        <Link href="/download" className="btn-outline light big rounded">
          Download & Try App now
        </Link>
      </div>
    </section>
  );
};

export default Hero;
