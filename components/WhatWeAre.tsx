"use client";

import React, { useEffect, useState, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const WhatWeAre = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width < 768 ? (
    <section id="what-we-are" className="!pb-0">
      <div className="text-4xl md:text-6xl font-bold max-w-5xl">
        What We Are
      </div>
      <div className="!text-stone-500 text-md md:text-xl sm:w-3/5 max-w-screen">
        A community of music lovers connecting, sharing, and discovering
        together. See what your friends are listening to and express your vibe.
      </div>

      <MobileView />
    </section>
  ) : (
    <section
      className="!w-screen !max-w-screen !p-0 rounded-[25px]"
      id="what-we-are"
    >
      <DesktopView />
    </section>
  );
};

// ====== MOBILE ======
const MobileView = () => {
  const texts = [
    "We built this place for people who live through music. Connect with friends, share what you're listening to, and discover new sounds together.",
    "Music isn't just sound — it's identity. Show your vibe, your tracks, and what defines your rhythm.",
    "No fake hype, no algorithm bullshit. Just real people and real music vibes.",
  ];

  return (
    <div className="flex-1 flex flex-col gap-[25px]">
      {texts.map((text, i) => (
        <div
          key={i}
          data-aos="fade-up"
          data-aos-delay={i * 100 + 300}
          className="bg-neutral-100 p-10 rounded-[20px] text-center text-black text-xl font-semibold"
        >
          {text}
        </div>
      ))}
    </div>
  );
};

const DesktopView = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Etap 1: powiększanie, fade-in i zaokrąglenie
  const scale = useTransform(scrollYProgress, [0, 0.33], [1, 4]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.33], [25, 0]);
  const boxOpacity = useTransform(scrollYProgress, [0, 0.1, 0.25], [0, 1, 1]);

  // Etap 2: zmiana tekstów po osiągnięciu pełnego rozmiaru
  const text1Opacity = useTransform(
    scrollYProgress,
    [0.33, 0.45, 0.55],
    [1, 0, 0]
  );
  const text2Opacity = useTransform(
    scrollYProgress,
    [0.45, 0.55, 0.7],
    [0, 1, 0]
  );
  const text3Opacity = useTransform(scrollYProgress, [0.7, 0.85, 1], [0, 1, 1]);

  // Different emojis for each text - more relevant to content
  const text1Emojis = ["🔗", "🎵", "👥", "🎧", "🔍", "🎶"]; // music, friends, connect, listening, discover, sounds
  const text2Emojis = ["🎭", "🎨", "💫", "🎤", "🎸", "✨"]; // identity, vibe, tracks, rhythm, expression
  const text3Emojis = ["💯", "🔥", "❤️", "🎪", "🌟", "💫"]; // real, authentic, genuine, vibes, no fake

  // Simple fixed positions around the text area (centered box)
  const textPositions = [
    { x: -220, y: 0, rotate: -10 },
    { x: 190, y: -30, rotate: 8 },
    { x: -100, y: 50, rotate: 12 },
    { x: 110, y: 40, rotate: -8 },
    { x: -100, y: -70, rotate: -6 },
    { x: 70, y: -90, rotate: 6 },
  ];

  const renderEmojis = (emojis: string[], opacity: any) =>
    emojis.map((emoji, index) => (
      <motion.div
        key={`emoji-${emoji}-${index}`}
        className="absolute text-2xl pointer-events-none z-0"
        style={{
          left: `calc(50% + ${textPositions[index].x}px)`,
          top: `calc(50% + ${textPositions[index].y}px)`,
          rotate: `${textPositions[index].rotate}deg`,
          opacity,
        }}
      >
        {emoji}
      </motion.div>
    ));

  return (
    <div ref={container} className="w-screen min-h-[300vh]">
      <div className="sticky top-0 flex items-center justify-center h-screen">
        <motion.div style={{ scale, opacity: boxOpacity }} className="el">
          <motion.div
            style={{ borderRadius }}
            className="bg-neutral-100 w-[25vw] h-[25vh] relative p-[25px] flex items-center justify-center overflow-hidden text-center text-black text-xs font-bold"
          >
            {/* Emojis for Text 1 */}
            {renderEmojis(text1Emojis, text1Opacity)}

            {/* Emojis for Text 2 */}
            {renderEmojis(text2Emojis, text2Opacity)}

            {/* Emojis for Text 3 */}
            {renderEmojis(text3Emojis, text3Opacity)}

            {/* Tekst 1 */}
            <motion.div
              style={{ opacity: text1Opacity }}
              className="absolute w-[70%] left-1/2 -translate-x-1/2 z-10"
            >
              We built this place for people who live through music. Connect
              with friends, share what you’re listening to, and discover new
              sounds together.
            </motion.div>

            {/* Tekst 2 */}
            <motion.div
              style={{ opacity: text2Opacity }}
              className="absolute w-[70%] left-1/2 -translate-x-1/2 z-10"
            >
              Music isn’t just sound — it’s identity. Show your vibe, your
              tracks, and what defines your rhythm.
            </motion.div>

            {/* Tekst 3 */}
            <motion.div
              style={{ opacity: text3Opacity }}
              className="absolute w-[70%] left-1/2 -translate-x-1/2 z-10"
            >
              No fake hype, no algorithm bullshit. Just real people and real
              music vibes.
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default WhatWeAre;
