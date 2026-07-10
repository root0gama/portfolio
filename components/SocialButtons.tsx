import type { IconType } from "react-icons";
import { SiGithub, SiInstagram, SiX } from "react-icons/si";
import { FiLink } from "react-icons/fi";

const META: Record<string, { icon: IconType; label: string }> = {
  github: { icon: SiGithub, label: "GitHub" },
  instagram: { icon: SiInstagram, label: "Instagram" },
  twitter: { icon: SiX, label: "X" },
  x: { icon: SiX, label: "X" },
};

export function SocialButtons({ links }: { links: [string, string][] }) {
  return (
    <div className="flex items-center justify-center gap-4">
      {links.map(([key, url]) => {
        const meta = META[key.toLowerCase()] ?? { icon: FiLink, label: key };
        const Icon = meta.icon;
        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={meta.label}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] text-zinc-200 transition-all duration-200 hover:scale-105 hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
}