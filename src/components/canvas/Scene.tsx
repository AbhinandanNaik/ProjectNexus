"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Stats, PerformanceMonitor, BakeShadows } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing";
import { NetworkGrid } from "./NetworkGrid";
import { DataLinks } from "./DataLinks";
import { DynamicCamera } from "./DynamicCamera";
import { useState } from "react";

export default function Scene() {
  const [dpr, setDpr] = useState(1.5);

  return (
    <Canvas 
      className="w-full h-screen" 
      camera={{ position: [0, 0, 25], fov: 60 }}
      dpr={dpr}
      shadows
    >
      {/* LOD & Performance Scaling */}
      <PerformanceMonitor onDecline={() => setDpr(1)} onInclined={() => setDpr(2)} />
      <BakeShadows />

      <DynamicCamera />
      {/* Performance Monitoring */}
      <Stats className="!absolute !top-32 !left-8" />
      
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <Environment preset="city" />

      {/* Massive Data Visualization */}
      <NetworkGrid />
      <DataLinks />

      {/* Post-Processing for Cyber Glow and Depth */}
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
      </EffectComposer>

      {/* Controls */}
      <OrbitControls autoRotate autoRotateSpeed={0.5} enablePan={false} maxDistance={40} minDistance={5} />
    </Canvas>
  );
}
