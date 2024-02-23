import AuthForm from "@/components/auth/authForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/home");
  }

  return (
    <>
    <Head>
        <title>Planet-Q-Production</title>
        <meta
          name="description"
          content="planet q production music player"
        />
        <link rel="icon" href="/images/small.webp" />
      </Head>
      <AuthForm />
    </>
  );
}

