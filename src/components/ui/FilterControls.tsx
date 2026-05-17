import { useNexusStore } from "@/store/useNexusStore";
import { Filter } from "lucide-react";

export function FilterControls() {
  const systemStatus = useNexusStore((state) => state.systemStatus);

  return (
    <div className="gsap-item bg-black/60 border border-cyan-500/30 p-4 rounded backdrop-blur-md flex flex-col gap-3 min-w-48">
      <div className="flex items-center gap-2 text-cyan-400 font-bold tracking-widest text-sm uppercase mb-2">
        <Filter className="w-4 h-4" />
        Filters
      </div>
      
      <label className="flex items-center gap-3 cursor-pointer">
        <input 
          type="checkbox" 
          defaultChecked 
          className="appearance-none w-4 h-4 border border-cyan-500 rounded-sm bg-black checked:bg-cyan-500 transition-colors"
          aria-label="Show Safe Nodes"
        />
        <span className="text-cyan-300/80 text-xs tracking-wider">Safe Nodes</span>
      </label>

      <label className="flex items-center gap-3 cursor-pointer">
        <input 
          type="checkbox" 
          defaultChecked 
          className="appearance-none w-4 h-4 border border-red-500 rounded-sm bg-black checked:bg-red-500 transition-colors"
          aria-label="Show Critical Threats"
        />
        <span className="text-red-400/80 text-xs tracking-wider">Critical Threats</span>
      </label>
    </div>
  );
}
