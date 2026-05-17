"use client";

import { useNexusStore } from "@/store/useNexusStore";
import { X } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const mockData = [
  { time: "00:00", requests: 120 },
  { time: "00:05", requests: 300 },
  { time: "00:10", requests: 150 },
  { time: "00:15", requests: 900 }, // threat spike
  { time: "00:20", requests: 850 },
];

export function NodeModal() {
  const { selectedNode, setSelectedNode } = useNexusStore();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedNode && panelRef.current) {
      gsap.fromTo(panelRef.current, 
        { x: 400, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [selectedNode]);

  if (!selectedNode) return null;

  return (
    <div 
      ref={panelRef}
      className="absolute top-24 right-8 w-96 bg-black/80 border border-cyan-500/50 backdrop-blur-lg p-6 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.2)] z-50 pointer-events-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-cyan-400 font-bold text-xl uppercase tracking-widest">Node Inspector</h2>
        <button 
          onClick={() => setSelectedNode(null)}
          className="text-cyan-500/50 hover:text-cyan-400 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between border-b border-cyan-500/20 pb-2">
          <span className="text-cyan-500/60 text-sm">Server ID</span>
          <span className="text-white font-mono">{selectedNode}</span>
        </div>
        <div className="flex justify-between border-b border-cyan-500/20 pb-2">
          <span className="text-cyan-500/60 text-sm">Location</span>
          <span className="text-white font-mono">US-EAST-1</span>
        </div>
        <div className="flex justify-between border-b border-cyan-500/20 pb-2">
          <span className="text-cyan-500/60 text-sm">Risk Score</span>
          <span className="text-red-500 font-mono font-bold">CRITICAL (94%)</span>
        </div>
      </div>

      <div className="h-48 w-full mt-8">
        <p className="text-xs text-cyan-500/50 uppercase tracking-widest mb-4">Traffic Analysis (Last 20m)</p>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData}>
            <XAxis dataKey="time" stroke="#06b6d4" opacity={0.3} fontSize={10} />
            <YAxis stroke="#06b6d4" opacity={0.3} fontSize={10} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(6,182,212,0.3)' }}
              itemStyle={{ color: '#ef4444' }}
            />
            <Line type="monotone" dataKey="requests" stroke="#ef4444" strokeWidth={2} dot={{ r: 4, fill: "#ef4444" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
