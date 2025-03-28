import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

export async function rateLimit(identifier: string) {
  const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "1 m"), // 100 solicitudes por minuto
    analytics: true,
    prefix: `@upstash/ratelimit`,
  });

  return await rateLimit.limit(identifier);
}
