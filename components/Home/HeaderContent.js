import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function HeadContent() {
  const { data: session } = useSession();

  async function logoutHandler(event) {
    event.preventDefault();
    if (session) {
      signOut();
    }
  }
  return (
    <>
      <div className="text-white bg-transparent flex justify-between items-center gap-4 px-6 py-2">
        <Link href="/home" className="bg-transparent flex justify-center items-center">
          <div className="bg-transparent flex flex-col justify-center items-center">
            <Image
              src="/images/client.png"
              alt="Your Logo"
              width={50}
              height={120}
              className="rounded-2xl bg-transparent"
            ></Image>
            <h1 className="bg-transparent text-xl text-center font-bold my-4 mx-2 sm:text-xl md:text-xl lg:text-sm xl:text-sm">
              Planet Q Productions
            </h1>
          </div>
        </Link>


        <div className="bg-transparent flex gap-4 justify-center items-center">
          <Link href="/planetqproduction" className="bg-transparent text-2xl font-bold hover:underline">Music Player</Link>
          <button
            className="text-white text-2xl font-bold ring-white ring-1 rounded-lg px-2 hover:underline hover:ring-2"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

// {status === "authenticated" && (
//   <h1 className="bg-transparent text-4xl font-bold my-4 mx-2 sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl">
//     <Link href="/home" className="bg-transparent">
//       Planet Q Productions
//     </Link>
//   </h1>
// )}

// {status === "authenticated" && (
//   <div className="bg-transparent">
//     <button
//       className="text-white text-2xl font-bold ring-white ring-1 rounded-lg px-2 hover:underline hover:ring-2"
//       onClick={logoutHandler}
//     >
//       Logout
//     </button>
//   </div>
// )}
