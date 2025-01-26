export default function AboutPage() {
  return (
    <div
      className="relative h-screen w-screen flex items-center justify-center"
      style={{
        backgroundImage: 'url("/images/about-background.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center text-white bg-black bg-opacity-50 px-8 py-4 rounded-lg">
        <h1 className="text-4xl font-bold mb-4">About Call-E</h1>
        <p className="text-lg">
          Call-E is designed to bridge communication gaps between patients and doctors, providing
          clarity and comfort.
        </p>
      </div>
    </div>
  );
}
