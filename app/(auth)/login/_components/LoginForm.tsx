"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { Loader2Icon, GithubIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export const LoginForm = () => {
  const [githubPending, startGithubTransition] = useTransition();
  const [anonymousPending, startAnonymousTransition] = useTransition();

  const router = useRouter();

  const signInWithGithub = async () => {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with GitHub, you will be redirected..");
          },
          onError: () => {
            toast.error("Internal server error");
          },
        },
      });
    });
  };

  const signInAnonymously = async () => {
    startAnonymousTransition(async () => {
      await authClient.signIn.anonymous({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in anonymously, you will be redirected..");
            router.push("/");
          },
          onError: () => {
            toast.error("Failed to sign in anonymously");
          },
        },
      });
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>Welcome!</CardTitle>
        <CardDescription>Login with GitHub or continue anonymously</CardDescription>
      </CardHeader>

      <CardContent className='flex flex-col gap-4'>
        <Button
          className='w-full'
          variant='outline'
          onClick={signInWithGithub}
          disabled={githubPending || anonymousPending}>
          {githubPending ? (
            <>
              <Loader2Icon className='size-4 animate-spin' />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <GithubIcon className='size-4' />
              Sign in with Github
            </>
          )}
        </Button>

        <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
          <span className='relative z-10 bg-card px-2 text-muted-foreground'>Or</span>
        </div>

        <Button
          className='w-full'
          variant='outline'
          onClick={signInAnonymously}
          disabled={anonymousPending || githubPending}>
          {anonymousPending ? (
            <>
              <Loader2Icon className='size-4 animate-spin' />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <UserIcon className='size-4' />
              Continue as Guest
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
