"use client";

import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();
  return (
    <div
      className="relative h-screen w-screen flex items-center justify-center"
      style={{
        backgroundImage: 'url("/images/about-background.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-10 left-20" style={{ height: "auto" }} >
        <span
          onClick={() => router.push("/")}
          className="text-white text-xl  px-4 py-2 bg-gray-500 rounded-lg shadow-lg hover:bg-gray-600 cursor-pointer"
        >
          Back
        </span>
      </div>
      <div className="text-center text-white bg-black bg-opacity-50 px-20 py-12 rounded-lg mx-20">
  <h1 className="text-4xl font-bold mb-4">About Calm-E📃</h1>
  <p className="text-xl">
    Hi! I'm Calm-E💗, your caring companion in the waiting room and beyond. I'm here to help you navigate your healthcare journey with ease and confidence.🌞
    👩‍⚕️👨‍⚕️Whether you’re waiting to see a doctor or reflecting after your visit, I'll provide insights✨ to help you understand medical information, prepare for visiting doctor, answer your questions, and ease any worries you may have.🫶 
    Together, we’ll make sure you feel informed, supported, and empowered every step of the way. Let's turn uncertainty into clarity and anxiety into comfort!🧚‍♀️🕶
  </p>
</div>
    </div>
  );
}
