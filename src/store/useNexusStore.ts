import { create } from 'zustand';

interface NexusState {
  activeThreats: number;
  networkTraffic: number;
  nodeCount: number;
  systemStatus: 'SECURE' | 'WARNING' | 'CRITICAL';
  selectedNode: string | null;
  setActiveThreats: (count: number) => void;
  setNetworkTraffic: (traffic: number) => void;
  setSystemStatus: (status: 'SECURE' | 'WARNING' | 'CRITICAL') => void;
  setSelectedNode: (id: string | null) => void;
}

export const useNexusStore = create<NexusState>((set) => ({
  activeThreats: 1402,
  networkTraffic: 8.4,
  nodeCount: 10000,
  systemStatus: 'SECURE',
  selectedNode: null,
  setActiveThreats: (count) => set({ activeThreats: count }),
  setNetworkTraffic: (traffic) => set({ networkTraffic: traffic }),
  setSystemStatus: (status) => set({ systemStatus: status }),
  setSelectedNode: (id) => set({ selectedNode: id }),
}));
