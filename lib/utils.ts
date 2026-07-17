/** Concatène des classes conditionnelles (version légère de `cn`). */
export function cn(
  ...classes: (string | false | null | undefined)[]
): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Préfixe un chemin d'asset (`/image.png`) avec le basePath du déploiement.
 * Nécessaire pour GitHub Pages (site servi sous `/portfolio/`), car
 * next/image ne préfixe pas automatiquement les fichiers de public/.
 */
export function asset(path: string): string {
  if (!path.startsWith("/")) return path;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
