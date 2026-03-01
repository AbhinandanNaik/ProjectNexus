"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";

export function AnimatedCube() {
    const meshRef = useRef<THREE.Mesh>(null);

    useEffect(() => {
        if (!meshRef.current) return;

        // GSAP Setup: Animate a simple rotation and position bouncing effect
        const ctx = gsap.context(() => {
            gsap.to(meshRef.current!.rotation, {
                y: Math.PI * 2,
                duration: 2,
                ease: "power2.inOut",
                repeat: -1,
                yoyo: true,
            });

            gsap.to(meshRef.current!.position, {
                y: 1,
                duration: 1,
                ease: "power1.inOut",
                repeat: -1,
                yoyo: true,
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#4f46e5" />
        </mesh>
    );
}
