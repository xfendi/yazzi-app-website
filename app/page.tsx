import React from "react";

import "@/styles/landing.css";

import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Features from "@/components/Features";
import PublicProfiles from "@/components/PublicProfiles";
import WhatWeAre from "@/components/WhatWeAre";
import Footer from "@/components/Footer";

import { RiScrollToBottomLine } from "react-icons/ri";

const HomePage = () => {
  return (
    <div className="pt-[114px]">
      <NavBar />

      <Header />
      <Features />

      <section className="w-full flex flex-col gap-5 justify-center items-center text-neutral-700 !pb-0">
        <RiScrollToBottomLine size={75} className="object-contain transition-transform duration-300 hover:scale-110" />
        <p className="text-2xl font-semibold">Keep scroling down</p>
      </section>

      <WhatWeAre />
      <PublicProfiles />

      <Footer />
    </div>
  );
};

export default HomePage;
