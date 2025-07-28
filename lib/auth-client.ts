import { createAuthClient } from "better-auth/react";
import { adminClient, anonymousClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [adminClient(), anonymousClient()],
});
