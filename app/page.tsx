import React from "react";

import "@/styles/landing.css";

import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Features from "@/components/Features";
import PublicProfiles from "@/components/PublicProfiles";
import WhatWeAre from "@/components/WhatWeAre";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const HomePage = () => {
  return (
    <div className="pt-[114px]">
      <NavBar />

      <Header />
      <Features />
      <WhatWeAre />
      <PublicProfiles />

  
      <Footer />
    </div>
  );
};

export default HomePage;
