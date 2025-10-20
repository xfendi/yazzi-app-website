import Link from "next/link";
import React from "react";

import "@/styles/features.scss";

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
    content: <></>,
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
    content: <></>,
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
    content: <></>,
  },
];

const Features = () => {
  return (
    <section className="!py-0" id="features">
      {cardsData.map((c, i) => (
        <Card data={c} i={i} key={i} />
      ))}
    </section>
  );
};

const Card = ({ data, i }: { data: any; i: number }) => {
  return (
    <div className="cardContainer">
      <div
        className={`card ${data.colorClass}`}
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

          <div className="flex-1 bg-neutral-950 rounded-[25px] h-full">
            {data.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
