"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function DataLinks() {
  const lineRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(100 * 6); // 100 lines, 2 points per line, 3 coords per point

    for (let i = 0; i < 100; i++) {
      // Random start point on inner sphere
      const r1 = 8;
      const t1 = Math.random() * Math.PI * 2;
      const p1 = Math.acos(Math.random() * 2 - 1);
      
      positions[i * 6] = r1 * Math.sin(p1) * Math.cos(t1);
      positions[i * 6 + 1] = r1 * Math.sin(p1) * Math.sin(t1);
      positions[i * 6 + 2] = r1 * Math.cos(p1);

      // Random end point on outer sphere
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
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#ef4444" transparent opacity={0.3} toneMapped={false} />
    </lineSegments>
  );
}
