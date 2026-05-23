"use client";

export default function Error({
  error,
  reset,
}) {

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#071426] px-6">

      <div className="text-center max-w-md">

        <h1 className="text-7xl font-bold text-red-500">
          Oops!
        </h1>

        <h2 className="text-3xl text-white mt-4 font-semibold">
          Something went wrong
        </h2>

        <p className="text-gray-400 mt-4">
          {error?.message || "Unexpected error occurred"}
        </p>

        <button
          onClick={() => reset()}
          className="mt-8 bg-[#e6983c] hover:bg-[#d98928] px-6 py-3 rounded-xl text-white font-semibold transition"
        >
          Try Again
        </button>

      </div>

    </div>
  );
}