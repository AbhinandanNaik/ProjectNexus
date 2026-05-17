"use client";

import { useRef, useMemo, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useNexusStore } from "@/store/useNexusStore";

const NODE_COUNT = 10000;

const NodeShaderMaterial = {
  uniforms: {
    uTime: { value: 0 }
  },
  vertexShader: `
    uniform float uTime;
    varying vec3 vColor;
    void main() {
      vColor = instanceColor;
      
      // Add a subtle breathing effect using the instance ID as an offset
      float pulse = sin(uTime * 2.0 + float(gl_InstanceID) * 0.1) * 0.1 + 1.0;
      
      vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position * pulse, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
    void main() {
      // Glow effect by raising color intensity
      gl_FragColor = vec4(vColor * 1.5, 1.0);
    }
  `
};

export function NetworkGrid() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const setSystemStatus = useNexusStore((state) => state.setSystemStatus);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(NODE_COUNT * 3);
    const colors = new Float32Array(NODE_COUNT * 3);
    
    const colorSafe = new THREE.Color("#06b6d4");
    const colorThreat = new THREE.Color("#ef4444");

    for (let i = 0; i < NODE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 8 + Math.random() * 4;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const isThreat = Math.random() > 0.95;
      const color = isThreat ? colorThreat : colorSafe;
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, []);

  useMemo(() => {
    if (!meshRef.current) return;
    
    const dummy = new THREE.Object3D();
    for (let i = 0; i < NODE_COUNT; i++) {
      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, new THREE.Color(colors[i * 3], colors[i * 3 + 1], colors[i * 3 + 2]));
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
    
    // Frustum Culling Optimization: Explicitly calculate bounding sphere for the instanced mesh
    meshRef.current.computeBoundingSphere();
  }, [positions, colors]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
      meshRef.current.rotation.x += delta * 0.02;
    }
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    // Simulate clicking a threat node
    if (e.instanceId !== undefined) {
      setSystemStatus("CRITICAL");
    }
  };

  return (
    <instancedMesh 
      ref={meshRef} 
      args={[undefined, undefined, NODE_COUNT]}
      onPointerDown={handlePointerDown}
    >
      <sphereGeometry args={[0.04, 8, 8]} />
      <shaderMaterial 
        ref={shaderRef}
        args={[NodeShaderMaterial]} 
        transparent 
        toneMapped={false}
      />
    </instancedMesh>
  );
}
