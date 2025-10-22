import { NextResponse } from "next/server";
import { checkRateLimit, getClientIP } from "@/lib/rate-limiter";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL!;

export async function POST(req: Request) {
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

    const { email } = await req.json();

    const res = await fetch(`${CONVEX_URL}/api/action`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: "website:subscribeNewsletter",
        args: { email },
      }),
    });

    const data = await res.json();

    // Check if Convex returned an error
    if (data.status === "error") {
      return NextResponse.json(
        { ok: false, error: data.errorData || "Subscription failed" },
        { status: 400 }
      );
    }

    // Success
    return NextResponse.json({ ok: true, data: data.value });
  } catch (error: any) {
    console.error("Newsletter error:", error);
    return NextResponse.json(
      { ok: false, error: error?.message ?? "Newsletter subscription failed" },
      { status: 500 }
    );
  }
}
