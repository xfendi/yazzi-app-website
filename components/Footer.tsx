import Image from "next/image";
import Link from "next/link";
import React from "react";

import { FaDiscord } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

import config from "@/config.json";
import NewsletterInput from "./NewsletterInput";

const Footer = () => {
  const SOCIAL_LINK_ICON_SIZE = 20;
  const socialLinks = [
    {
      icon: <FaDiscord size={SOCIAL_LINK_ICON_SIZE} />,
      link: config.discord_url,
    },
    {
      icon: <FaTiktok size={SOCIAL_LINK_ICON_SIZE} />,
      link: config.tiktok_url,
    },
    {
      icon: <FaInstagram size={SOCIAL_LINK_ICON_SIZE} />,
      link: config.instagram_url,
    },
  ];

  return (
    <footer className="bg-neutral-900 flex flex-col gap-5 md:gap-10 !text-white items-center">
      <p className="text-6xl md:text-8xl font-[400] text-center">
        Pssst. Available now!
      </p>

      <Link
        href="/download"
        className="btn-outline primary big rounded !w-max mt-5 md:mt-0"
      >
        Download App
      </Link>

      <div className="divider my-5 md:my-0"></div>

      <NewsletterInput />

      <div className="divider my-5 md:my-0"></div>

      <div className="relative w-full flex gap-5 flex-col md:gap-0 md:flex-row items-center justify-between !text-stone-500 text-[14px]">
        <p>&copy; Yazzi 2025. All rights reserved.</p>

        <div className="flex gap-2.5 items-center !text-white md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2">
          {socialLinks.map((s, i) => (
            <a
              key={i}
              href={s.link}
              title="social link"
              className="btn-outline aspect-square rounded flex items-center justify-center !p-[10px]"
            >
              {s.icon}
            </a>
          ))}
        </div>

        <Link href="/legal">Legal Info</Link>
      </div>
    </footer>
  );
};

export default Footer;
