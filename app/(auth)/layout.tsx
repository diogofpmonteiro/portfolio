import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='relative flex min-h-svh flex-col items-center justify-center'>
      <Link
        href='/'
        className={buttonVariants({
          variant: "outline",
          className: "absolute top-4 left-4",
        })}>
        <ArrowLeft className='size-4' /> Back
      </Link>

      <div className='flex w-full max-w-sm flex-col gap-6'>
        {children}

        <div className='text-balance text-center text-xs text-muted-foreground'>
          By clicking continue, you agree to our{" "}
          <span className='hover:text-primary hover:underline cursor-pointer'>Terms of service</span> and{" "}
          <span className='hover:text-primary hover:underline cursor-pointer'>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
