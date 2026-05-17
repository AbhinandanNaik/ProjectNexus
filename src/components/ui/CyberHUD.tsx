"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Activity, ShieldAlert, Globe2, Cpu } from "lucide-react";

export function CyberHUD() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      // Animate the main container fading in
      gsap.from(containerRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });
      
      // Stagger animate all elements with the 'gsap-item' class
      gsap.from(".gsap-item", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.5
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 z-10 text-cyan-500 font-mono">
      {/* Top Bar */}
      <div className="flex justify-between items-start">
        <div className="gsap-item bg-black/60 border border-cyan-500/30 p-4 rounded backdrop-blur-md">
          <h1 className="text-2xl font-bold text-white tracking-widest uppercase flex items-center gap-2">
            <Globe2 className="w-6 h-6 text-cyan-400" />
            Project Nexus
          </h1>
          <p className="text-cyan-400/70 text-sm mt-1 uppercase tracking-wider">Global Threat Map v2.4</p>
        </div>
        
        <div className="gsap-item bg-black/60 border border-red-500/30 p-4 rounded backdrop-blur-md flex items-center gap-4">
          <ShieldAlert className="w-8 h-8 text-red-500 animate-pulse" />
          <div>
            <div className="text-red-400 text-xs uppercase tracking-widest">Active Threats</div>
            <div className="text-2xl font-bold text-white">1,402</div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-end">
        <div className="gsap-item bg-black/60 border border-cyan-500/30 p-4 rounded backdrop-blur-md flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="text-sm">Network Traffic: 8.4 Tbps</span>
          </div>
          <div className="flex items-center gap-3">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-sm">Node Count: 10,000</span>
          </div>
        </div>
        
        <div className="gsap-item text-right">
          <div className="text-xs text-cyan-400/50 uppercase tracking-widest mb-1">System Status</div>
          <div className="text-sm border border-cyan-500/30 bg-black/60 px-3 py-1 rounded backdrop-blur-md text-cyan-300">
            SECURE
          </div>
        </div>
      </div>
    </div>
  );
}
