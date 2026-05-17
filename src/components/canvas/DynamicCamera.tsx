import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useNexusStore } from "@/store/useNexusStore";

export function DynamicCamera() {
  const { camera } = useThree();
  const systemStatus = useNexusStore((state) => state.systemStatus);
  const isAnimating = useRef(false);

  useEffect(() => {
    if (systemStatus === "CRITICAL" && !isAnimating.current) {
      isAnimating.current = true;
      // Fly into the globe
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 12,
        duration: 1.5,
        ease: "power3.inOut",
        onComplete: () => {
          // Pull back out after 3 seconds
          setTimeout(() => {
            gsap.to(camera.position, {
              x: 0,
              y: 0,
              z: 25,
              duration: 2,
              ease: "power3.inOut",
              onComplete: () => { isAnimating.current = false; }
            });
          }, 3000);
        }
      });
    }
  }, [systemStatus, camera.position]);

  return null;
}
