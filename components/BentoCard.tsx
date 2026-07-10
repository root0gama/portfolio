"use client";

import { motion } from "motion/react";
import { useRef, type MouseEvent } from "react";

type BentoCardProps = {
  children: React.ReactNode;
  className?: string;
  /** index pour décaler l'apparition au scroll */
  index?: number;
  /** désactive le spotlight (ex: cartes purement décoratives) */
  spotlight?: boolean;
  /** classes de padding (varie d'une carte à l'autre pour un rythme organique) */
  pad?: string;
};

export function BentoCard({
  children,
  className = "",
  index = 0,
  spotlight = true,
  pad = "p-6",
}: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={spotlight ? handleMove : undefined}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={
        "group relative overflow-hidden rounded-[1.9rem] border border-[var(--color-border)] " +
        "bg-[var(--color-surface)] backdrop-blur-xl " +
        "shadow-[0_10px_50px_-12px_rgba(0,0,0,0.6)] " +
        "transition-colors duration-300 " +
        pad +
        " " +
        className
      }
    >
      {spotlight && (
        <>
          <div className="card-spotlight" />
          <div className="card-border-glow" />
        </>
      )}
      {/* reflet en haut de la carte */}
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
