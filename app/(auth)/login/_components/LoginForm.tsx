"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { Loader2, SendIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export const LoginForm = () => {
  const router = useRouter();
  const [emailPending, startEmailTransition] = useTransition();

  const [email, setEmail] = useState("");

  const signInWithEmail = () => {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email sent");
            router.push(`/verify-request?email=${email}`);
          },
          onError: () => {
            toast.error("Error sending email");
          },
        },
      });
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>Login</CardTitle>
      </CardHeader>

      <CardContent className='flex flex-col gap-4'>
        <div className='grid gap-6'>
          <Label htmlFor='email'>Email</Label>
          <Input
            type='email'
            placeholder='m@example.com'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <Button onClick={signInWithEmail} disabled={emailPending}>
            {emailPending ? (
              <>
                <Loader2 className='size-4 animate-spin' />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <SendIcon className='size-4' />
                <span>Continue with Email</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
