"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { Loader2Icon, GithubIcon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export const LoginForm = () => {
  const [githubPending, startGithubTransition] = useTransition();

  const signInWithGithub = async () => {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with GitHub, you will be redirected..");
          },
          onError: (_error) => {
            toast.error("Internal server error");
          },
        },
      });
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>Welcome back!</CardTitle>
        <CardDescription>Login with Github</CardDescription>
      </CardHeader>

      <CardContent className='flex flex-col gap-4'>
        <Button className='w-full' variant='outline' onClick={signInWithGithub} disabled={githubPending}>
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
      </CardContent>
    </Card>
  );
};
