"use client";

import React from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

type Props = { children: React.ReactNode };

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);

export default function ConvexProviderClient({ children }: Props) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
