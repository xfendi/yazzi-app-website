"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { IoOpenOutline } from "react-icons/io5";

import { motion, useTransform, useScroll } from "framer-motion";

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
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [profiles, setProfiles] = useState<PublicProfileDisplayType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setNotFound(false);
      try {
        const res = await fetch("/api/public-profiles");
        const json = await res.json();
        if (json.ok && Array.isArray(json.data) && json.data.length > 0) {
          setProfiles(json.data);
          setNotFound(false);
        } else {
          setProfiles([]);
          setNotFound(true);
        }
      } catch (err) {
        console.error(err);
        setProfiles([]);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section data-aos="fade-up" className={`${width < 768 && "!pb-0"}`}>
      <div className="text-4xl md:text-6xl font-bold max-w-5xl">
        Explore Popular Public Profiles
      </div>
      <div className="!text-stone-500 text-md md:text-xl sm:w-3/5 max-w-screen">
        Explore popular public profiles and see what’s trending in the
        community. Get inspired by how others share their music and style.
      </div>

      {isLoading ? (
        <div className="p-2 px-4 text-neutral-300 bg-neutral-900 rounded-[10px]">
          Loading profiles…
        </div>
      ) : notFound ? (
        <div className="p-2 px-4 text-neutral-300 bg-neutral-900 rounded-[10px]">
          No public profiles found.
        </div>
      ) : width < 768 ? (
        <MobileView profilesData={profiles} />
      ) : (
        <HorizontalScrollCarousel profilesData={profiles} />
      )}
    </section>
  );
};

const MobileView = ({
  profilesData,
}: {
  profilesData: PublicProfileDisplayType[];
}) => {
  return (
    <div className="flex-1 flex flex-col gap-[25px] w-full">
      {profilesData.map((p, i) => (
        <div key={i} data-aos="fade-up" data-aos-delay={i * 100 + 300}>
          <ProfileCard p={p} />
        </div>
      ))}
    </div>
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
