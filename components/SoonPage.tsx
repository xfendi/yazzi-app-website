import Image from "next/image";
import React from "react";
import NewsletterInput from "./NewsletterInput";

const SoonPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <section data-aos="fade-up" className="!py-0">
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
          App coming soon, Enter newsletter and beta invite list below!
        </div>

        <NewsletterInput />
      </section>
    </div>
  );
};

export default SoonPage;
