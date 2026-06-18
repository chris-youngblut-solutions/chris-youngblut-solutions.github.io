// Shared theme constants — single source of truth for the no-FOUC inline script
// (Base.astro) and the ThemeToggle island, so the localStorage key and attribute
// name never drift. Day/night only. Key aligns with panel-tiling's cabin.theme.v1.

export type Cabin = "day" | "night";
export const THEME_KEY = "cabin.theme";

export function currentCabin(): Cabin {
  return (document.documentElement.dataset.cabin as Cabin) ?? "day";
}
export function setCabin(c: Cabin): void {
  document.documentElement.dataset.cabin = c;
  try {
    localStorage.setItem(THEME_KEY, c);
  } catch {
    /* private mode — non-fatal */
  }
}
