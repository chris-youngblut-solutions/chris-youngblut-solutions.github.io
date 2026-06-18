import { useEffect, useState } from "react";
import { type Cabin, currentCabin, setCabin } from "../theme";

// Editorial day/night stamp (uppercase, Cabin's .cabin-btn-stamp). Defaults to
// the OS preference (auto — set pre-paint by the no-FOUC script); a click
// overrides + persists. Day/night only. No inline styles (CSP-safe).
function Sun() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M19.4 4.6l-1.8 1.8M6.4 17.6l-1.8 1.8" />
    </svg>
  );
}
function Moon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
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
      className="cabin-btn-stamp theme-stamp"
      role="switch"
      aria-checked={night}
      aria-label="Toggle night mode"
      onClick={toggle}
    >
      <span className="theme-stamp-ico">{night ? <Moon /> : <Sun />}</span>
      {night ? "Night" : "Day"}
    </button>
  );
}
