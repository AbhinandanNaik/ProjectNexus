import { Moon, Sun, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export function ThemeLangToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState("EN");

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="gsap-item absolute bottom-8 left-8 flex gap-4 bg-black/60 border border-cyan-500/30 p-2 rounded backdrop-blur-md pointer-events-auto">
      <button 
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 text-cyan-500 hover:text-cyan-300 transition-colors rounded hover:bg-cyan-950/50"
        aria-label="Toggle Theme"
      >
        {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>

      <button 
        onClick={() => setLang(lang === "EN" ? "ES" : "EN")}
        className="flex items-center gap-2 p-2 text-cyan-500 hover:text-cyan-300 transition-colors rounded hover:bg-cyan-950/50 text-xs font-bold"
        aria-label="Toggle Language"
      >
        <Globe className="w-4 h-4" />
        {lang}
      </button>
    </div>
  );
}
