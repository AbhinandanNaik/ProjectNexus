import Scene from "@/components/canvas/Scene";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="absolute top-0 left-0 w-full z-10 p-8 text-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <h1 className="text-4xl font-bold text-white tracking-widest uppercase">Project Nexus</h1>
        <p className="text-gray-200 mt-2">Enterprise 3D Data Visualization Platform</p>
      </div>

      {/* 3D Canvas wrapper */}
      <div className="w-full h-screen bg-neutral-900">
        <Scene />
      </div>
    </main>
  );
}
