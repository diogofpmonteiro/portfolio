import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    AUTH_GITHUB_CLIENT_ID: z.string().min(1),
    AUTH_GITHUB_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_EMAIL_PUBLIC_KEY: z.string().min(1),
    NEXT_PUBLIC_EMAIL_SERVICE_ID: z.string().min(1),
    NEXT_PUBLIC_EMAIL_TEMPLATE_ID: z.string().min(1),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_GITHUB_CLIENT_ID: process.env.AUTH_GITHUB_CLIENT_ID,
    AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
    NEXT_PUBLIC_EMAIL_PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
    NEXT_PUBLIC_EMAIL_SERVICE_ID: process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
    NEXT_PUBLIC_EMAIL_TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID,
  },
});
