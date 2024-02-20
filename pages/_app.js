import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
// import Layout from "@/components/layout/layout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
