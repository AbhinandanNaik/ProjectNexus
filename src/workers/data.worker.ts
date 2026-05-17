// This worker handles the complex math for 10,000 nodes off the main thread
self.onmessage = (e: MessageEvent<{ nodeCount: number }>) => {
  const { nodeCount } = e.data;

  const positions = new Float32Array(nodeCount * 3);
  const colors = new Float32Array(nodeCount * 3);

  // We are recreating the math here inside the worker so it doesn't block the UI
  for (let i = 0; i < nodeCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const radius = 8 + Math.random() * 4;

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    const isThreat = Math.random() > 0.95;
    
    // Hex to RGB math manually for the worker without THREE.Color dependency
    if (isThreat) {
      // Red #ef4444 -> 239, 68, 68
      colors[i * 3] = 239 / 255;
      colors[i * 3 + 1] = 68 / 255;
      colors[i * 3 + 2] = 68 / 255;
    } else {
      // Cyan #06b6d4 -> 6, 182, 212
      colors[i * 3] = 6 / 255;
      colors[i * 3 + 1] = 182 / 255;
      colors[i * 3 + 2] = 212 / 255;
    }
  }

  // Pass back to main thread
  self.postMessage({ positions, colors });
};
