import Link from "next/link";

export default function main() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <p className="text-center text-4xl text-white">
          Welcome to my Website
        </p>
        <div className="text-center flex flex-col">
          <Link href="/signin" legacyBehavior>
            <a className="inline-block px-10 py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-500">
              Login
            </a>
          </Link>
          <Link href="/home" legacyBehavior>
            <a className="inline-block px-10 py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-500">
              Home
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
