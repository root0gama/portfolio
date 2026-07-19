"use client";

import { useEffect, useRef, useState } from "react";
import { FiEye } from "react-icons/fi";

// Compteur hébergé (Abacus) — le site est un export statique sans backend,
// il faut donc un service externe pour un compteur réellement partagé.
const ENDPOINT = "https://abacus.jasoncameron.dev";
const NAMESPACE = "root0gama-portfolio";
const KEY = "views";

export function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const called = useRef(false);

  useEffect(() => {
    // évite le double appel du StrictMode en dev
    if (called.current) return;
    called.current = true;

    // en dev on lit sans incrémenter, pour ne pas fausser le compteur réel
    const action = process.env.NODE_ENV === "production" ? "hit" : "get";

    fetch(`${ENDPOINT}/${action}/${NAMESPACE}/${KEY}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { value?: number }) => {
        if (typeof d.value === "number") setViews(d.value);
        else setFailed(true);
      })
      .catch(() => setFailed(true));
  }, []);

  // en cas d'échec du service, on n'affiche rien plutôt qu'un compteur cassé
  if (failed) return null;

  return (
    <span
      title="Vues totales"
      className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--color-border)] bg-white/5 px-3 py-2 font-mono text-xs text-zinc-400"
    >
      <FiEye className="h-3.5 w-3.5" />
      {views === null ? (
        <span className="inline-block h-3 w-8 animate-pulse rounded bg-white/10" />
      ) : (
        <span className="text-zinc-100">{views.toLocaleString("fr-FR")}</span>
      )}
    </span>
  );
}
