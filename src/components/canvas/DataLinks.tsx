"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const LinkShaderMaterial = {
  uniforms: {
    uTime: { value: 0 }
  },
  vertexShader: `
    uniform float uTime;
    varying float vDistance;
    void main() {
      // Calculate a gradient effect based on position and time
      vDistance = sin(position.x * 2.0 + uTime * 5.0) * 0.5 + 0.5;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    varying float vDistance;
    void main() {
      // Red lines that pulse with "data packets"
      vec3 color = mix(vec3(0.5, 0.0, 0.0), vec3(1.0, 0.2, 0.2), vDistance);
      gl_FragColor = vec4(color, vDistance * 0.8);
    }
  `
};

export function DataLinks() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const shaderRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(100 * 6);

    for (let i = 0; i < 100; i++) {
      const r1 = 8;
      const t1 = Math.random() * Math.PI * 2;
      const p1 = Math.acos(Math.random() * 2 - 1);
      
      positions[i * 6] = r1 * Math.sin(p1) * Math.cos(t1);
      positions[i * 6 + 1] = r1 * Math.sin(p1) * Math.sin(t1);
      positions[i * 6 + 2] = r1 * Math.cos(p1);

      const r2 = 12;
      const t2 = Math.random() * Math.PI * 2;
      const p2 = Math.acos(Math.random() * 2 - 1);

      positions[i * 6 + 3] = r2 * Math.sin(p2) * Math.cos(t2);
      positions[i * 6 + 4] = r2 * Math.sin(p2) * Math.sin(t2);
      positions[i * 6 + 5] = r2 * Math.cos(p2);
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (lineRef.current) {
      lineRef.current.rotation.y += delta * 0.05;
      lineRef.current.rotation.x += delta * 0.02;
    }
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <shaderMaterial 
        ref={shaderRef}
        args={[LinkShaderMaterial]} 
        transparent 
        toneMapped={false} 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}
