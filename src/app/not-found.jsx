import Link from "next/link";

export default function NotFound() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#071426] px-6">

      <div className="text-center">

        <h1 className="text-8xl font-bold text-[#e6983c]">
          404
        </h1>

        <h2 className="text-4xl text-white font-semibold mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-400 mt-4">
          The page you are looking for does not exist.
        </p>

        <Link href="/">
          <button className="mt-8 bg-[#e6983c] hover:bg-[#d98928] px-6 py-3 rounded-xl text-white font-semibold transition">
            Back To Home
          </button>
        </Link>

      </div>

    </div>
  );
}