"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

import "@/styles/features.scss";
import Image from "next/image";

const cardsData = [
  {
    title: "Your friends current playing Spotify tracks",
    description:
      "Add your friends by code or username and see what they’re listening to in real time on the feed or widget.",
    button: (
      <Link href="/download" className="btn-outline light big rounded">
        Get the App
      </Link>
    ),
    colorClass: "bg-blue-900",
    content: (
      <div className="relative w-full h-full flex flex-col items-center gap-5 rounded-[15px] scale-110 bottom-[20px]">
        {Array.from({ length: 3 }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="flex-1 h-1/3 flex w-full justify-center gap-5"
          >
            {Array.from({ length: rowIndex === 1 ? 3 : 2 }).map(
              (_, colIndex) => {
                const index = rowIndex * 3 + colIndex;
                const imageIndex = rowIndex === 0 ? index + 1 : index;
                return (
                  <Image
                    key={index}
                    src={`/features/players/${imageIndex}.png`}
                    alt={`player image nr. ${imageIndex}`}
                    className="object-cover transition-transform duration-300 hover:scale-105 h-full rounded-[10px]"
                    width={1000}
                    height={475}
                  />
                );
              }
            )}
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Check music matches and statistics",
    description:
      "See your compatibility with friends, top artists, and track stats. Compare your vibe instantly.",
    button: (
      <Link href="/download" className="btn-outline light big rounded">
        Get the App
      </Link>
    ),
    colorClass: "bg-pink-900",
    content: <></>,
  },
  {
    title: "Set your music status",
    description:
      "Show others your current vibe by setting a custom music status like mood or emoji, your call.",
    button: (
      <Link href="/download" className="btn-outline light big rounded">
        Get the App
      </Link>
    ),
    colorClass: "bg-green-900",
    content: (
      <div className="relative w-full h-full flex items-center justify-center rounded-[15px] overflow-hidden">
        <Image
          src={`/features/screens/status.png`}
          alt={`music status screenshot`}
          width={1206}
          height={871}
          className="h-2/3 w-auto object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>
    ),
  },
  {
    title: "Keep your status streak alive",
    description:
      "Listen and grow your streak! Track how long you've been vibing without missing status.",
    button: (
      <Link href="/download" className="btn-outline light big rounded">
        Get the App
      </Link>
    ),
    colorClass: "bg-yellow-800",
    content: (
      <div className="relative w-full h-full flex items-start justify-center rounded-[15px] overflow-hidden">
        <Image
          src={`/features/screens/status-streak.png`}
          alt={`music status screenshot`}
          width={1206}
          height={1623}
          className="h-full w-1/2 object-contain"
        />
        <Image
          src={`/features/screens/profile-streak.png`}
          alt={`music status screenshot`}
          width={1206}
          height={1623}
          className="h-1/2 w-1/2 object-contain"
        />
      </div>
    ),
  },
];

const Features = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width < 768 ? (
    <section id="features" className="flex flex-col gap-[25px] !pb-0">
      {cardsData.map((c, i) => (
        <MobileCard data={c} key={i} i={i} />
      ))}
    </section>
  ) : (
    <section className="!py-0" id="features">
      {cardsData.map((c, i) => (
        <Card data={c} i={i} key={i} />
      ))}
    </section>
  );
};

const MobileCard = ({ data, i }: { data: any; i: number }) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={i * 100 + 300}
      className={`flex flex-col gap-10 items-center w-full p-5 !pt-10 rounded-[20px] ${data.colorClass}`}
    >
      <div className="flex-1 flex flex-col gap-5 items-center text-center">
        <div className="text-2xl md:text-4xl font-semibold">{data.title}</div>
        <div className="!text-stone-200 text-md">{data.description}</div>
      </div>

      <div className="w-full aspect-square flex-1 bg-neutral-950 rounded-[15px] h-full overflow-hidden">
        {data.content}
      </div>
    </div>
  );
};

const Card = ({ data, i }: { data: any; i: number }) => {
  return (
    <div className="cardContainer pointer-events-none">
      <div
        className={`card ${data.colorClass} pointer-events-auto`}
        style={{ top: `calc(10vh + ${i * 25}px)` }}
      >
        <div className="flex gap-10 items-center w-full">
          <div className="flex-1 flex flex-col gap-5 items-center text-center">
            <div className="text-2xl md:text-4xl font-bold max-w-5xl">
              {data.title}
            </div>
            <div className="!text-stone-300 text-md w-2/3 max-w-screen">
              {data.description}
            </div>
            {data.button}
          </div>

          <div className="max-w-1/2 flex-1 bg-neutral-950 rounded-[25px] h-full overflow-hidden">
            {data.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
