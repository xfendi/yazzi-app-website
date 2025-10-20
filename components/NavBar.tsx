"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { LuMenu } from "react-icons/lu";
import config from "@/config.json";
import Image from "next/image";

const NavBar = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="navbar-container">
      <nav
        className="shadow-2xl w-full md:w-max bg-neutral-900"
        data-aos="fade-down"
      >
        <Link href="/" className="flex items-center gap-4 !w-max">
          <div className="flex items-center gap-2 transition-all duration-300 hover:scale-120 hover:rotate-12">
            <Image
              src="/images/symbol.png"
              alt="Yazzi symbol logo"
              width={30}
              height={30}
            />
          </div>
        </Link>

        <button
          name="open nav menu button"
          onClick={() => setShowMenu(true)}
          className={width < 768 ? "flex" : "hidden"}
        >
          <LuMenu size={30} />
        </button>

        <div
          className={`!flex ${
            width < 768
              ? "absolute pointer-events-none top-0 left-0 right-0 bottom-0 hidden opacity-0 h-screen"
              : "opacity-100"
          } ${
            width < 768 && showMenu && "opacity-100 z-50 !pointer-events-auto"
          } transition-all duration-300`}
        >
          {width < 768 && showMenu && (
            <div
              className="bg-[rgba(0,0,0,0.9)] fixed h-screen  -top-[40px] -left-[40px] -right-[40px]"
              onClick={() => setShowMenu(false)}
            ></div>
          )}
          <ul
            className={`${
              width < 768 &&
              "!flex flex-col absolute w-max top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            } font-medium hidden md:flex items-center gap-[16px]`}
          >
            <li>
              <a href={config?.discord_url} className="navbar-link">
                Discord
              </a>
            </li>
            <li>
              <Link href="#what-we-are" className="navbar-link">
                What We Are
              </Link>
            </li>
            <li>
              <Link href="#features" className="navbar-link">
                Our Features
              </Link>
            </li>
          </ul>
        </div>

        {width > 768 && (
          <Link href="/download" className="btn-outline primary rounded">
            Download
          </Link>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
