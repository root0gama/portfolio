/** Concatène des classes conditionnelles (version légère de `cn`). */
export function cn(
  ...classes: (string | false | null | undefined)[]
): string {
  return classes.filter(Boolean).join(" ");
}
