"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const WhatWeAre = () => {
  return (
    <section
      className="!w-screen !max-w-screen !p-0 rounded-[25px]"
      id="what-we-are"
    >
      <ZoomElement />
    </section>
  );
};

const ZoomElement = () => {
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
  const text1Opacity = useTransform(scrollYProgress, [0.33, 0.45, 0.55], [1, 0, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.45, 0.55, 0.7], [0, 1, 0]);
  const text3Opacity = useTransform(scrollYProgress, [0.7, 0.85, 1], [0, 1, 1]);

  return (
    <div ref={container} className="w-screen min-h-[300vh]">
      <div className="sticky top-0 flex items-center justify-center h-screen">
        <motion.div style={{ scale, opacity: boxOpacity }} className="el">
          <motion.div
            style={{ borderRadius }}
            className="bg-neutral-100 w-[25vw] h-[25vh] relative p-[25px] flex items-center justify-center overflow-hidden text-center text-black text-xs font-bold"
          >
            {/* Tekst 1 */}
            <motion.div
              style={{ opacity: text1Opacity }}
              className="absolute w-[70%] left-1/2 -translate-x-1/2"
            >
              We built this place for people who live through music. Connect
              with friends, share what you’re listening to, and discover new
              sounds together.
            </motion.div>

            {/* Tekst 2 */}
            <motion.div
              style={{ opacity: text2Opacity }}
              className="absolute w-[70%] left-1/2 -translate-x-1/2"
            >
              Music isn’t just sound — it’s identity. Show your vibe, your
              tracks, and what defines your rhythm.
            </motion.div>

            {/* Tekst 3 */}
            <motion.div
              style={{ opacity: text3Opacity }}
              className="absolute w-[70%] left-1/2 -translate-x-1/2"
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
