import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { LoginForm } from "./_components/LoginForm";
import { auth } from "@/lib/auth";

const LoginPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect("/");
  }

  return <LoginForm />;
};

export default LoginPage;
