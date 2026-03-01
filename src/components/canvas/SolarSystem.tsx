"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function SolarSystem() {
    // References to the meshes so we can rotate them in the animation loop
    const sunRef = useRef<THREE.Mesh>(null);
    const planetRef = useRef<THREE.Mesh>(null);
    const moonRef = useRef<THREE.Mesh>(null);

    // useFrame is a React Three Fiber hook that runs on every frame (roughly 60fps)
    useFrame((state, delta) => {
        // 1. Rotate the sun on its own axis
        if (sunRef.current) {
            sunRef.current.rotation.y += delta * 0.2;
        }

        // 2. Rotate the planet
        // Because the moon is a child of the planet, the moon will naturally 
        // orbit the planet just by the planet rotating on its own axis!
        if (planetRef.current) {
            planetRef.current.rotation.y += delta * 1.0; // Planet rotates faster
        }
    });

    return (
        <group>
            {/* 
        The SUN is the center of our local scene at (0, 0, 0)
      */}
            <mesh ref={sunRef}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} />

                {/* 
          The PLANET is a child of the SUN.
          If we move the planet to x=3, it's relative to the sun.
        */}
                <group position={[3, 0, 0]}>
                    <mesh ref={planetRef}>
                        <sphereGeometry args={[0.4, 32, 32]} />
                        <meshStandardMaterial color="#3b82f6" />

                        {/* 
              The MOON is a child of the PLANET.
              If we move the moon to x=1, it is 1 unit away from the planet,
              not the center of the universe!
            */}
                        <mesh ref={moonRef} position={[1, 0, 0]}>
                            <sphereGeometry args={[0.15, 32, 32]} />
                            <meshStandardMaterial color="#9ca3af" />
                        </mesh>
                    </mesh>
                </group>
            </mesh>
        </group>
    );
}
