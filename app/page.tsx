import Image from "next/image";
import { profile } from "@/data/profile";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { BentoCard } from "@/components/BentoCard";
import { LocalTime } from "@/components/LocalTime";
import { Gallery } from "@/components/Gallery";
import { TextMarquee } from "@/components/ui/text-marquee";
import {
  FiArrowUpRight,
  FiMapPin,
  FiClock,
  FiBriefcase,
  FiLayers,
  FiGrid,
  FiZap,
  FiCode,
  FiClipboard,
  FiGitMerge,
  FiDatabase,
  FiMessageCircle,
} from "react-icons/fi";
import { SiGithub } from "react-icons/si";

/* --------------------------------------------------------------
   Portfolio en grille "Bento" — positionnement calqué sur la page
   profil (2 colonnes 0.82fr / 1fr, mêmes slots), palette monochrome.
---------------------------------------------------------------- */

const SERVICE_ICONS: Record<string, typeof FiCode> = {
  code: FiCode,
  manage: FiClipboard,
  integration: FiGitMerge,
  perf: FiZap,
  model: FiDatabase,
  comm: FiMessageCircle,
};

function Arrow({ className = "" }: { className?: string }) {
  return (
    <FiArrowUpRight
      className={
        "h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 " +
        className
      }
    />
  );
}

function Monogram({ name, size = "h-12 w-12", text = "text-lg" }: {
  name: string;
  size?: string;
  text?: string;
}) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div
      className={`grid ${size} shrink-0 place-items-center rounded-xl bg-gradient-to-br from-white to-zinc-500 font-bold text-black ${text} ring-2 ring-[var(--color-border)]`}
    >
      {initials}
    </div>
  );
}

export default function Home() {
  const {
    name,
    handle,
    role,
    tagline,
    about,
    email,
    location,
    since,
    socials,
    focus,
    stack,
    services,
    gallery,
    projects,
    experiences,
  } = profile;

  const firstName = name.split(/\s+/)[0];
  const featured = projects[0];
  const caseStudy = projects[1] ?? projects[0];

  return (
    <>
      <AnimatedBackground />

      {/* ---------- BARRE SUPÉRIEURE (collante, comme le profil) ---------- */}
      <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-bg)]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1080px] items-center justify-between px-5">
          <div className="flex items-center gap-2 font-mono text-sm text-zinc-500">
            <span className="h-6 w-6 rounded-lg bg-gradient-to-br from-white to-zinc-600" />
            /u/<span className="text-zinc-100">{handle}</span>
          </div>
          <div className="flex items-center gap-1">
            <a
              href={`mailto:${email}`}
              className="group inline-flex items-center gap-1.5 rounded-xl border border-[var(--color-border)] bg-white/5 px-3.5 py-2 text-xs font-bold text-zinc-100 transition-colors hover:border-white/25 hover:bg-white/10"
            >
              Contact <Arrow />
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1080px] px-5 pb-6 pt-8">
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)]">
          {/* ===================== COLONNE GAUCHE ===================== */}
          <div className="flex flex-col gap-4">
            {/* slot 1 — Identité (≈ IdentityCard) */}
            <BentoCard index={0} pad="p-7">
              <div className="flex items-center gap-3">
                <Monogram name={name} />
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/5 px-3 py-1 text-[11px] font-medium text-zinc-300">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                  </span>
                  Disponible
                </span>
              </div>

              <div className="mt-5">
                <p className="font-mono text-sm text-zinc-500">@{handle}</p>
                <h1 className="mt-1 text-[28px] font-medium leading-none tracking-tight">
                  {firstName}{" "}
                  <span className="font-display text-zinc-400">
                    {name.split(/\s+/).slice(1).join(" ")}
                  </span>
                </h1>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
                  {role}
                </p>
              </div>

              <p className="mt-4 text-[15px] leading-relaxed text-zinc-400">
                {tagline} {about}
              </p>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <FiMapPin className="h-4 w-4 text-zinc-600" />
                  {location}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiClock className="h-4 w-4 text-zinc-600" />
                  <LocalTime />
                </span>
                <span className="flex items-center gap-1.5 text-zinc-500">
                  {since}
                </span>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <a
                  href={`mailto:${email}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-2 pr-5 text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-zinc-200"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-black text-white">
                    <FiArrowUpRight className="h-3 w-3" />
                  </span>
                  Me contacter
                </a>
                {socials.github && (
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
                  >
                    <SiGithub className="h-3.5 w-3.5" />
                    GitHub
                  </a>
                )}
              </div>
            </BentoCard>

            {/* slot 2 — Focus actuel (≈ NowPlayingCard) */}
            <BentoCard index={1} pad="p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-[var(--color-border)] bg-white/5">
                  <FiZap className="h-5 w-5 text-zinc-300" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-zinc-500">
                    {focus.label} · {focus.status}
                  </p>
                  <p className="truncate font-semibold text-zinc-100">
                    {focus.title}
                  </p>
                </div>
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.5)]" />
              </div>
            </BentoCard>

            {/* slot 3 — Étude de cas / capture (≈ PostCard) */}
            <BentoCard index={2} pad="p-4">
              <a
                href={caseStudy.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="overflow-hidden rounded-xl border border-[var(--color-border)]">
                  <div className="flex h-6 items-center gap-1.5 bg-white/5 px-3">
                    <span className="h-2 w-2 rounded-full bg-zinc-600" />
                    <span className="h-2 w-2 rounded-full bg-zinc-600" />
                    <span className="h-2 w-2 rounded-full bg-zinc-600" />
                  </div>
                  <div className="relative h-36">
                    <Image
                      src={caseStudy.image}
                      alt={`Aperçu — ${caseStudy.title}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 440px"
                      className="object-cover object-center"
                    />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="text-[15px] font-medium text-zinc-100">
                    {caseStudy.title}
                  </p>
                  <Arrow className="text-zinc-500 group-hover:text-white" />
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-zinc-400">
                  {caseStudy.description}
                </p>
              </a>
            </BentoCard>

            {/* slot 4 — Ce que je fais (grille 6 ≈ BadgesCard) */}
            <BentoCard index={3} pad="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-zinc-100">Ce que je fais</h3>
                  <p className="text-sm text-zinc-500">
                    {services.length} spécialités
                  </p>
                </div>
                <FiGrid className="h-4 w-4 text-zinc-500" />
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {services.map((s) => {
                  const Ico = SERVICE_ICONS[s.icon] ?? FiLayers;
                  return (
                    <div
                      key={s.name}
                      className="group flex flex-col items-center gap-1.5 rounded-xl border border-[var(--color-border)] bg-white/5 py-4 transition-colors hover:border-white/25"
                      title={s.desc}
                    >
                      <Ico className="h-5 w-5 text-zinc-300" />
                      <span className="px-1 text-center text-[11px] font-semibold leading-tight text-zinc-300">
                        {s.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </BentoCard>
          </div>

          {/* ===================== COLONNE DROITE ===================== */}
          <div className="flex flex-col gap-4">
            {/* slot 1 — Projet à la une (≈ FeaturedCard) — capture d'écran, sans lien */}
            <BentoCard
              index={1}
              spotlight={false}
              pad="p-5"
              className="flex min-h-[300px] flex-col bg-white/[0.06]"
            >
              <div className="flex items-center justify-between px-1">
                <span className="w-fit rounded-lg border border-[var(--color-border)] bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-200">
                  Projet à la une
                </span>
                <FiLayers className="h-5 w-5 text-zinc-500" />
              </div>

              {/* aperçu du projet dans un cadre navigateur */}
              <div className="mt-4 overflow-hidden rounded-xl border border-[var(--color-border)]">
                <div className="flex h-6 items-center gap-1.5 bg-white/5 px-3">
                  <span className="h-2 w-2 rounded-full bg-zinc-600" />
                  <span className="h-2 w-2 rounded-full bg-zinc-600" />
                  <span className="h-2 w-2 rounded-full bg-zinc-600" />
                </div>
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={featured.image}
                    alt={`Aperçu — ${featured.title}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              <div className="mt-4 px-1">
                <h3 className="text-xl font-semibold text-white">
                  {featured.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                  {featured.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {featured.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-[var(--color-border)] bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </BentoCard>

            {/* slot 2 — Mon stack (marquee vertical) */}
            <BentoCard
              index={2}
              spotlight={false}
              pad="p-6"
              className="flex min-h-[263px] items-center"
            >
              <TextMarquee
                prefix={
                  <span className="mr-3 text-2xl font-semibold text-zinc-500">
                    mon stack :
                  </span>
                }
                height={150}
                speed={0.9}
                className="text-2xl font-bold text-zinc-100"
              >
                {stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </TextMarquee>
            </BentoCard>

            {/* slot 3 — Galerie (carrousel ≈ PhotoCard) */}
            <BentoCard index={3} spotlight={false} pad="p-0">
              <Gallery slides={gallery} />
            </BentoCard>

            {/* slot 4 — Expériences (≈ ReviewsCard) */}
            <BentoCard index={4} pad="p-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-zinc-100">Expériences</h3>
                <div className="flex items-center gap-1.5 text-sm text-zinc-500">
                  <FiBriefcase className="h-4 w-4" />
                  <span className="font-bold text-zinc-100">
                    {experiences.length}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                {experiences.map((xp) => (
                  <div key={xp.company} className="flex gap-3">
                    <Monogram name={xp.company} size="h-9 w-9" text="text-sm" />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-zinc-100">
                          {xp.company}
                        </span>
                        <span className="font-mono text-[11px] text-zinc-500">
                          {xp.role}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm leading-relaxed text-zinc-400">
                        {xp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>
          </div>
        </div>
      </main>
    </>
  );
}
