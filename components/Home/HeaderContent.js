import Link from "next/link";
import { useRouter } from "next/router";

export default function HeadContent() {
  const router = useRouter();

  async function logoutHandler(event) {
    event.preventDefault();

    router.push("/signin");
  }
  return (
    <>
      <div className="text-white bg-transparent flex justify-between items-center gap-4 px-6 py-2">
        <h1 className="bg-transparent text-4xl font-bold my-4 mx-2 sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl">
          <Link href="/home" className="bg-transparent">
            Planet Q Productions
          </Link>
        </h1>

        <div className="bg-transparent">
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
