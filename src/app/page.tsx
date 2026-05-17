import Scene from "@/components/canvas/Scene";
import { CyberHUD } from "@/components/ui/CyberHUD";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between bg-black overflow-hidden">
      {/* 2D Overlay */}
      <CyberHUD />
      
      {/* 3D Canvas wrapper */}
      <div className="absolute inset-0 w-full h-screen">
        <Scene />
      </div>
    </main>
  );
}
