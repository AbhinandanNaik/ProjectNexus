"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { SolarSystem } from "./SolarSystem";

export default function Scene() {
  return (
    <Canvas className="w-full h-screen" camera={{ position: [0, 5, 10], fov: 50 }}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="city" />

      {/* Minimum Viable Scene objects */}
      <SolarSystem />

      {/* Controls */}
      <OrbitControls />
    </Canvas>
  );
}
