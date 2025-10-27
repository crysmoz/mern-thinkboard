import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

// 🧩 Global Redis instance (shared across all requests)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  console.error("[RateLimiter] ❌ Missing Redis credentials.");
} else {
  console.log("[RateLimiter] ✅ Redis client initialized once globally.");
}

// 🧩 Global rate limiter: 3 requests per 10 seconds
const limiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "10 s"),
  analytics: true,
});

export const rateLimiter = async (req, res, next) => {
  try {
    const ip =
      req.headers["x-forwarded-for"] ||
      req.connection?.remoteAddress ||
      req.socket?.remoteAddress ||
      "unknown";

    const { success, remaining } = await limiter.limit(ip);
    console.log(`RateLimiter check for ${ip} → success=${success}, remaining=${remaining}`);

    if (!success) {
      console.warn("⚡ Rate limit triggered for:", ip);
      return res
        .status(429)
        .json({ error: "Too many requests. Please wait a few seconds." });
    }

    next();
  } catch (error) {
    console.error("Rate limiter error:", error.message);
    next();
  }
};
