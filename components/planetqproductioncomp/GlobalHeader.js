import Link from "next/link";

import Image from "next/image";

export default function GlobalHeader() {
  return (
    <>
      <div className="text-white bg-transparent flex justify-between items-center gap-4 px-6 py-2">
        <Link
          href="/planetqproduction"
          className="bg-transparent flex justify-center items-center"
        >
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
      </div>
    </>
  );
}
