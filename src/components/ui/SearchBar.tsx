import { Search } from "lucide-react";
import { useState } from "react";
import { useNexusStore } from "@/store/useNexusStore";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const setSelectedNode = useNexusStore((state) => state.setSelectedNode);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Simulate finding the node and flying to it
      setSelectedNode(`NXS-NODE-${query.toUpperCase()}`);
      setQuery("");
    }
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className="gsap-item relative flex items-center bg-black/60 border border-cyan-500/30 rounded backdrop-blur-md px-3 py-2 w-72"
    >
      <Search className="w-4 h-4 text-cyan-400 mr-2" />
      <input
        type="text"
        placeholder="Search Node ID..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-transparent border-none outline-none text-cyan-300 text-sm font-mono w-full placeholder-cyan-500/50"
        aria-label="Search Node ID"
      />
    </form>
  );
}
