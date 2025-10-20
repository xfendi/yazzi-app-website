"use client";

import { useEffect } from "react";
import AOS from "aos";

import "aos/dist/aos.css";

export default function AOSInitializer() {
  useEffect(() => {
    AOS.init({
      delay: 300,
      once: true,
    });
  }, []);

  return null;
}
