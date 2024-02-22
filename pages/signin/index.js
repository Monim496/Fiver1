import AuthForm from "@/components/auth/authForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/home");
  }

  return (
    <>
      <AuthForm />
    </>
  );
}
