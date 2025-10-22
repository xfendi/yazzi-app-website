// lib/rate-limiter.ts
const rateLimitMap = new Map<string, number[]>();

interface RateLimitConfig {
  maxAttempts?: number;
  windowMs?: number;
  cooldownMs?: number; // Minimum time between requests
}

export function getClientIP(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  return forwarded?.split(",")[0] || realIp || "unknown";
}

export function checkRateLimit(
  key: string,
  config?: RateLimitConfig
): { allowed: boolean; remaining: number; retryAfter?: number } {
  const maxAttempts = config?.maxAttempts ?? 5;
  const windowMs = config?.windowMs ?? 60000; // 1 minute default
  const cooldownMs = config?.cooldownMs ?? 5; // No cooldown by default

  const now = Date.now();
  const attempts = rateLimitMap.get(key) || [];

  // Remove old attempts outside the time window
  const recentAttempts = attempts.filter((time) => now - time < windowMs);

  // Check cooldown (minimum time between requests)
  if (cooldownMs > 0 && recentAttempts.length > 0) {
    const lastAttempt = Math.max(...recentAttempts);
    const timeSinceLastAttempt = now - lastAttempt;

    if (timeSinceLastAttempt < cooldownMs) {
      const retryAfter = Math.ceil((cooldownMs - timeSinceLastAttempt) / 1000);
      rateLimitMap.set(key, recentAttempts);
      return { allowed: false, remaining: 0, retryAfter };
    }
  }

  // Check if rate limited (max attempts exceeded)
  if (recentAttempts.length >= maxAttempts) {
    rateLimitMap.set(key, recentAttempts);
    return { allowed: false, remaining: 0 };
  }

  // Add current attempt
  recentAttempts.push(now);
  rateLimitMap.set(key, recentAttempts);

  return {
    allowed: true,
    remaining: maxAttempts - recentAttempts.length,
  };
}

// Optional: Cleanup old entries periodically (prevents memory leaks)
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, attempts] of rateLimitMap.entries()) {
      const recentAttempts = attempts.filter((time) => now - time < 3600000);
      if (recentAttempts.length === 0) {
        rateLimitMap.delete(key);
      } else {
        rateLimitMap.set(key, recentAttempts);
      }
    }
  }, 300000); // Cleanup every 5 minutes
}
