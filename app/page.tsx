"use client";

import { useRouter } from "next/navigation";

export default function StartPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/chat");
  };

  const handleAbout = () => {
    router.push("/about");
  };

  return (
    <div
      className="relative h-screen w-screen"
      style={{
        backgroundImage: 'url("/images/start-background.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute top-[22%] right-[10%] flex flex-col items-end items-center justify-center h-screen p-8 gap-4"
        style={{ height: "auto" }} 
      >
        <h1 className="text-6xl font-bold mb-4 text-blue-800 p-4 rounded-lg" style={{ marginBottom: "80px" }}>CALM-E</h1>
        <span
          onClick={handleGetStarted}
          className="text-white text-3xl bg-blue-500 px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 cursor-pointer"
          style={{ marginBottom: "100px" }}
        >
          Get Started
        </span>
        <span
          onClick={handleAbout}
          className="text-white text-3xl bg-gray-500 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-600 cursor-pointer"
        >
          About
        </span>
      </div>

      
    </div>
  );
}
