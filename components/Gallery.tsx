"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Slide = { src: string; label: string };

const AUTOPLAY_MS = 5000;

export function Gallery({ slides }: { slides: readonly Slide[] }) {
  const [i, setI] = useState(0);
  const count = slides.length;

  // défilement automatique toutes les 5 s ; se réarme quand `i` change
  // (donc un clic manuel relance le compte à rebours)
  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(
      () => setI((prev) => (prev + 1) % count),
      AUTOPLAY_MS,
    );
    return () => clearInterval(id);
  }, [i, count]);

  if (count === 0) return null;

  const go = (dir: number) => setI((prev) => (prev + dir + count) % count);

  return (
    <div className="group relative flex h-full min-h-[240px] flex-col">
      {/* images empilées, fondu entre elles */}
      <div className="relative flex-1">
        {slides.map((s, k) => (
          <Image
            key={s.src}
            src={s.src}
            alt={`Aperçu — ${s.label}`}
            fill
            sizes="(max-width: 1024px) 100vw, 560px"
            className={
              "object-cover object-top transition-opacity duration-500 " +
              (k === i ? "opacity-100" : "opacity-0")
            }
            priority={k === 0}
          />
        ))}
      </div>

      {/* flèches de navigation */}
      <button
        aria-label="Photo précédente"
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white ring-1 ring-[var(--color-border)] backdrop-blur transition-colors hover:bg-black/70"
      >
        <FiChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Photo suivante"
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white ring-1 ring-[var(--color-border)] backdrop-blur transition-colors hover:bg-black/70"
      >
        <FiChevronRight className="h-5 w-5" />
      </button>

      {/* indicateurs de progression */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1.5">
        {slides.map((s, k) => (
          <button
            key={s.src}
            aria-label={`Voir ${s.label}`}
            onClick={() => setI(k)}
            className={
              "h-1.5 rounded-full transition-all " +
              (i === k ? "w-5 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60")
            }
          />
        ))}
      </div>
    </div>
  );
}
