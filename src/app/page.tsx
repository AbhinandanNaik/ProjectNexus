import dynamic from "next/dynamic";
import { CyberHUD } from "@/components/ui/CyberHUD";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

const Scene = dynamic(() => import("@/components/canvas/Scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black text-cyan-500 font-mono">
      Initializing WebGL Engine...
    </div>
  ),
});

export default function Home() {
  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      <CyberHUD />
      <ErrorBoundary>
        <div className="absolute inset-0 w-full h-screen">
          <Scene />
        </div>
      </ErrorBoundary>
    </main>
  );
}
