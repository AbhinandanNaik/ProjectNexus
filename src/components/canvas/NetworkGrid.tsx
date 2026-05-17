"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const NODE_COUNT = 10000;

export function NetworkGrid() {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Generate node positions and colors once
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(NODE_COUNT * 3);
    const colors = new Float32Array(NODE_COUNT * 3);
    
    const colorSafe = new THREE.Color("#06b6d4"); // Cyan
    const colorThreat = new THREE.Color("#ef4444"); // Red

    for (let i = 0; i < NODE_COUNT; i++) {
      // Create a large spherical grid
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 8 + Math.random() * 4;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta); // x
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta); // y
      positions[i * 3 + 2] = radius * Math.cos(phi); // z

      // 5% chance of being a threat node
      const isThreat = Math.random() > 0.95;
      const color = isThreat ? colorThreat : colorSafe;
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, []);

  // Set positions and colors into the InstancedMesh
  useMemo(() => {
    if (!meshRef.current) return;
    
    const dummy = new THREE.Object3D();
    for (let i = 0; i < NODE_COUNT; i++) {
      dummy.position.set(
        positions[i * 3],
        positions[i * 3 + 1],
        positions[i * 3 + 2]
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      
      const color = new THREE.Color(colors[i * 3], colors[i * 3 + 1], colors[i * 3 + 2]);
      meshRef.current.setColorAt(i, color);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [positions, colors]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
      meshRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, NODE_COUNT]}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshStandardMaterial 
        toneMapped={false} 
        emissive="#ffffff" 
        emissiveIntensity={0.2} 
        vertexColors 
      />
    </instancedMesh>
  );
}
