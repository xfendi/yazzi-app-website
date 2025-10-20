import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <section data-aos="fade-up" className="!pb-0 !pt-[100px]">
      <div className="icon-stack">
        <div className="layer layer3 bg-neutral-900"></div>
        <div className="layer layer2 bg-neutral-800"></div>
        <div className="layer layer1">
          <Image
            src="/images/fill-logo.png"
            alt="Yazzi logo"
            className="rounded-[20px]"
            width={85}
            height={85}
          />
        </div>
      </div>

      <div className="text-5xl md:text-7xl xl:text-8xl font-bold max-w-5xl">
        Connect your music <br /> with friends
      </div>
      <div className="!text-stone-500 text-md md:text-xl sm:w-2/5 max-w-screen">
        SM based app that connects music with friends and sharing your energy
        with vibe!
      </div>
    </section>
  );
};

export default Header;
