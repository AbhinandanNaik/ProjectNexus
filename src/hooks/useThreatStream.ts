"use client";

import { useEffect } from "react";
import { useNexusStore } from "@/store/useNexusStore";

// Mocking a WebSocket connection for enterprise data streaming
export function useThreatStream() {
  const { setActiveThreats, setNetworkTraffic, setSystemStatus } = useNexusStore();

  useEffect(() => {
    // In a real enterprise app, this would be:
    // const socket = io("wss://api.nexus.com");
    // socket.on("threat_update", (data) => { ... })
    
    const interval = setInterval(() => {
      // Simulate fluctuating network traffic
      const trafficSpike = Math.random() * 2 - 1; // -1 to +1
      setNetworkTraffic(8.4 + trafficSpike);

      // Simulate incoming threats
      const randomThreat = Math.floor(Math.random() * 50) - 20;
      setActiveThreats(1402 + randomThreat);

      // Update status based on logic
      if (randomThreat > 20) {
        setSystemStatus('WARNING');
      } else if (randomThreat > 40) {
        setSystemStatus('CRITICAL');
      } else {
        setSystemStatus('SECURE');
      }

    }, 2000);

    return () => clearInterval(interval);
  }, [setActiveThreats, setNetworkTraffic, setSystemStatus]);
}
