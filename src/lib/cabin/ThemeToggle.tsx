import { useEffect, useState } from "react";
import { type Cabin, currentCabin, setCabin } from "../theme";

// Minimalist lightbulb day/night toggle — the bulb IS the button. Day = lit
// (filled, accent) bulb; night = outline (off). Defaults to the OS preference
// (auto — set pre-paint by the no-FOUC script); a click overrides + persists.
// Day/night only. No inline styles (CSP-safe).
function Bulb({ lit }: { lit: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        d="M12 3a6 6 0 0 0-3.9 10.55c.55.5.9 1.28.9 2.05v.4h6v-.4c0-.77.35-1.55.9-2.05A6 6 0 0 0 12 3z"
        fill={lit ? "currentColor" : "none"}
      />
      <path d="M9.5 19.5h5M10.5 22h3" />
    </svg>
  );
}

export default function ThemeToggle() {
  const [cabin, setC] = useState<Cabin>("day");

  // Reflect the resolved theme (auto or stored) after mount.
  useEffect(() => setC(currentCabin()), []);

  const night = cabin === "night";
  function toggle() {
    const next: Cabin = night ? "day" : "night";
    setCabin(next);
    setC(next);
  }

  return (
    <button
      type="button"
      className="theme-bulb"
      role="switch"
      aria-checked={night}
      aria-label="Toggle night mode"
      title={night ? "Lights on" : "Lights off"}
      onClick={toggle}
    >
      <Bulb lit={!night} />
    </button>
  );
}
