import { checkRateLimit, getClientIP } from "@/lib/rate-limiter";
import { NextResponse } from "next/server";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL!;

// prosty cache w pamięci
let cache: any = null;
let cacheTimestamp = 0;
const CACHE_TTL = 1000 * 60 * 60; // 1h

export async function GET(req: Request) {
  try {
    // Rate limiting
    const clientIP = getClientIP(req);
    const { allowed, retryAfter } = checkRateLimit(clientIP);
    if (!allowed) {
      const message = retryAfter
        ? `Please wait ${retryAfter} seconds before trying again.`
        : "Too many requests. Please try again later.";
      return NextResponse.json({ ok: false, error: message }, { status: 429 });
    }

    // Cache check
    const now = Date.now();
    if (cache && now - cacheTimestamp < CACHE_TTL) {
      return NextResponse.json({ ok: true, data: cache, cached: true });
    }

    const res = await fetch(`${CONVEX_URL}/api/action`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: "users:getTopPublicProfiles",
        args: {},
      }),
      // ważne: wyłącz domyślny cache fetch'a, żeby kontrolować samemu
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Convex function failed");
    const data = await res.json();

    // Zapisz do cache
    cache = data;
    cacheTimestamp = now;

    return NextResponse.json({ ok: true, data, cached: false });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message ?? "Failed to load public profiles" },
      { status: 500 }
    );
  }
}
