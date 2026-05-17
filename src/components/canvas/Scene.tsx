"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Stats } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { NetworkGrid } from "./NetworkGrid";
import { DataLinks } from "./DataLinks";
import { DynamicCamera } from "./DynamicCamera";

export default function Scene() {
  return (
    <Canvas className="w-full h-screen" camera={{ position: [0, 0, 25], fov: 60 }}>
      <DynamicCamera />
      {/* Performance Monitoring */}
      <Stats className="!absolute !top-32 !left-8" />
      
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="city" />

      {/* Massive Data Visualization */}
      <NetworkGrid />
      <DataLinks />

      {/* Post-Processing for Cyber Glow */}
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
      </EffectComposer>

      {/* Controls */}
      <OrbitControls autoRotate autoRotateSpeed={0.5} enablePan={false} maxDistance={40} minDistance={5} />
    </Canvas>
  );
}
