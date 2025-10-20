"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoOpenOutline } from "react-icons/io5";

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

export type PublicProfileDisplayType = {
  photoURL: string;
  name: string;
  username: string;

  verified: boolean;

  reactionsCount: number;
  starsCount: number;

  recentPlayedTracks: {
    artist: string;
    image: string;
    name: string;
    spotifyId: string;
  }[];
};

const PublicProfiles = () => {
  const placeholderProfile: PublicProfileDisplayType = {
    photoURL: "https://i.imgur.com/EckYk5C.jpeg",
    name: "Fro zi ak",
    username: "fendziorr",

    verified: true,

    reactionsCount: 125,
    starsCount: 15,

    recentPlayedTracks: Array(4).fill({
      artist: "Oki",
      image: "https://i.scdn.co/image/ab67616d0000b273f9f11a7e2e02afa1301c260e",
      name: "JESTEŚMY ZA MŁODZI",
      spotifyId: "4pnnjYVnTpWRFhtWSWE5ad",
    }),
  };

  const placeholderProfiles: PublicProfileDisplayType[] =
    Array(5).fill(placeholderProfile);

  return (
    <section data-aos="fade-up">
      <div className="text-4xl md:text-6xl font-bold max-w-5xl">
        Explore Popular Public Profiles
      </div>
      <div className="!text-stone-500 text-md md:text-xl sm:w-3/5 max-w-screen">
        Explore popular public profiles and see what’s trending in the
        community. Get inspired by how others share their music and style.
      </div>

      <HorizontalScrollCarousel profilesData={placeholderProfiles} />
    </section>
  );
};

const HorizontalScrollCarousel = ({
  profilesData,
}: {
  profilesData: PublicProfileDisplayType[];
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);

  return (
    <div ref={targetRef} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {profilesData.map((p, i) => (
            <ProfileCard p={p} key={i} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const ProfileCard = ({ p }: { p: PublicProfileDisplayType }) => {
  return (
    <div className="flex flex-col gap-5 bg-neutral-900 p-5 rounded-[20px] transition-all duration-300 hover:scale-95">
      <div className="flex gap-5 items-center">
        <Image
          src={p.photoURL}
          width={512}
          height={512}
          alt={`${p.username}'s profile photo`}
          className="w-[70px] h-[70px] object-cover rounded-full"
        />
        <div className="flex flex-col items-start text-start">
          <p className="text-2xl font-semibold">{p.name}</p>
          <p className="text-md text-neutral-500">@{p.username}</p>
        </div>
        <button className="ml-auto btn-outline aspect-square flex items-center justify-center">
          <IoOpenOutline size={24} />
        </button>
      </div>

      <div className="divider"></div>

      <div className="flex gap-10 items-center">
        <div className="flex flex-col">
          <p className="text-xl font-semibold">{p.reactionsCount}</p>
          <span className="text-md text-neutral-500">Reactions</span>
        </div>
        <div className="flex flex-col">
          <p className="text-xl font-semibold">{p.starsCount}</p>
          <span className="text-md text-neutral-500">Stars</span>
        </div>
      </div>

      {p.recentPlayedTracks && p.recentPlayedTracks.length > 1 && (
        <>
          <div className="divider"></div>

          <div className="flex gap-5 items-center">
            {p.recentPlayedTracks.map((t, i) => (
              <Track track={t} key={i} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const Track = ({
  track,
}: {
  track: PublicProfileDisplayType["recentPlayedTracks"][0];
}) => {
  return (
    <div className="w-max flex flex-col gap-2.5">
      <Link href={`/track/${track.spotifyId}`}>
        <Image
          src={track.image}
          alt={`${track.name} cover image`}
          width={512}
          height={512}
          className="rounded-[10px] transition-all duration-300 hover:scale-110 cursor-pointer !w-[70px] !h-[70px]"
        />
      </Link>
      <p className="text-xs text-neutral-500">{track.artist}</p>
    </div>
  );
};

export default PublicProfiles;
