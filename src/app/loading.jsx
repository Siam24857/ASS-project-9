export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#071426]">
      <div className="text-center">

        <div className="w-16 h-16 border-4 border-[#e6983c] border-t-transparent rounded-full animate-spin mx-auto"></div>

        <h2 className="text-white text-2xl mt-6 font-semibold">
        <span className="loading loading-spinner loading-xl"></span>
        </h2>

        <p className="text-gray-400 mt-2">
          Please wait while we prepare your study room
        </p>

      </div>
    </div>
  );
}