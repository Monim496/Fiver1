import Link from "next/link";

import Image from "next/image";

export default function GlobalHeader() {
  return (
    <>
      <div className="text-white bg-transparent flex justify-center items-center gap-4 px-6 py-2">
        <Link
          href="https://planetqproductions.wixsite.com/planet-q-productions"
          className="bg-transparent flex justify-center items-center"
          target="_blank"
        >
          <div className="bg-transparent flex flex-col gap-2 justify-center items-center">
            <Image
              src="/images/client.png"
              alt="Your Logo"
              width={50}
              height={120}
              className="rounded-2xl bg-transparent"
            ></Image>
            <h1 className="animate-text bg-gradient-to-r text-center from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-sm font-black">
              View More
            </h1>
          </div>
        </Link>
      </div>
    </>
  );
}
