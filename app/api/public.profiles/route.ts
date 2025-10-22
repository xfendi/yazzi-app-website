import { NextResponse } from "next/server";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL!;

export async function GET() {
  try {
    // Wywołanie funkcji Convexa przez endpoint produkcyjny
    const res = await fetch(`${CONVEX_URL}/api.users.getTopPublicProfiles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (!res.ok) throw new Error("Convex function failed");

    const data = await res.json();

    return NextResponse.json({ ok: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message ?? "Failed to load public profiles" },
      { status: 500 }
    );
  }
}
