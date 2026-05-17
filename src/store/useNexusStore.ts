import { create } from 'zustand';

interface NexusState {
  activeThreats: number;
  networkTraffic: number;
  nodeCount: number;
  systemStatus: 'SECURE' | 'WARNING' | 'CRITICAL';
  setActiveThreats: (count: number) => void;
  setNetworkTraffic: (traffic: number) => void;
  setSystemStatus: (status: 'SECURE' | 'WARNING' | 'CRITICAL') => void;
}

export const useNexusStore = create<NexusState>((set) => ({
  activeThreats: 1402,
  networkTraffic: 8.4,
  nodeCount: 10000,
  systemStatus: 'SECURE',
  setActiveThreats: (count) => set({ activeThreats: count }),
  setNetworkTraffic: (traffic) => set({ networkTraffic: traffic }),
  setSystemStatus: (status) => set({ systemStatus: status }),
}));
