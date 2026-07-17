"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

type Slide = { src: string; label: string };

const AUTOPLAY_MS = 5000;

export function Gallery({ slides }: { slides: readonly Slide[] }) {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const count = slides.length;

  // défilement automatique toutes les 5 s ; en pause quand le lightbox est ouvert.
  // se réarme quand `i` change (donc un clic manuel relance le compte à rebours)
  useEffect(() => {
    if (count <= 1 || open) return;
    const id = setInterval(
      () => setI((prev) => (prev + 1) % count),
      AUTOPLAY_MS,
    );
    return () => clearInterval(id);
  }, [i, count, open]);

  // lightbox : Échap pour fermer, flèches pour naviguer, blocage du scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowLeft") setI((p) => (p - 1 + count) % count);
      else if (e.key === "ArrowRight") setI((p) => (p + 1) % count);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, count]);

  if (count === 0) return null;

  const go = (dir: number) => setI((prev) => (prev + dir + count) % count);
  const current = slides[i];

  return (
    <div className="group relative flex h-full min-h-[240px] flex-col">
      {/* images empilées, fondu entre elles — cliquables pour agrandir */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Agrandir — ${current.label}`}
        className="relative flex-1 cursor-zoom-in"
      >
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
      </button>

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

      {/* ---------- LIGHTBOX (portail vers <body>) ---------- */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
              >
                {/* fermer */}
                <button
                  aria-label="Fermer"
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-white/20"
                >
                  <FiX className="h-5 w-5" />
                </button>

                {/* précédent / suivant */}
                {count > 1 && (
                  <>
                    <button
                      aria-label="Photo précédente"
                      onClick={(e) => {
                        e.stopPropagation();
                        go(-1);
                      }}
                      className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-white/20 sm:left-6"
                    >
                      <FiChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      aria-label="Photo suivante"
                      onClick={(e) => {
                        e.stopPropagation();
                        go(1);
                      }}
                      className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-white/20 sm:right-6"
                    >
                      <FiChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                {/* image agrandie */}
                <motion.figure
                  key={current.src}
                  initial={{ scale: 0.94, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
                  onClick={(e) => e.stopPropagation()}
                  className="flex max-h-full max-w-5xl flex-col items-center"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={current.src}
                    alt={current.label}
                    className="max-h-[82vh] w-auto rounded-xl object-contain shadow-2xl ring-1 ring-white/10"
                    draggable={false}
                  />
                  <figcaption className="mt-3 text-center text-sm text-zinc-300">
                    {current.label}
                  </figcaption>
                </motion.figure>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
