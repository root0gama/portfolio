export function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Halos gris/blanc flous qui dérivent lentement */}
      <div className="animate-drift absolute -left-[10%] top-[-15%] h-[55vw] w-[55vw] rounded-full bg-white/10 blur-[130px] [animation-duration:22s]" />
      <div className="animate-drift absolute right-[-12%] top-[8%] h-[45vw] w-[45vw] rounded-full bg-zinc-400/10 blur-[130px] [animation-duration:28s] [animation-delay:-6s]" />
      <div className="animate-drift absolute bottom-[-22%] left-[18%] h-[50vw] w-[50vw] rounded-full bg-white/[0.07] blur-[130px] [animation-duration:25s] [animation-delay:-12s]" />

      {/* Grille fine */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, #000 40%, transparent 100%)",
        }}
      />

      {/* Vignette pour la profondeur */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(6,6,9,0.9)_100%)]" />

      {/* Grain */}
      <div className="grain absolute inset-0 opacity-[0.035] mix-blend-overlay" />
    </div>
  );
}
