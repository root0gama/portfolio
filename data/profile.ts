// =============================================================
//  ÉDITE CE FICHIER POUR PERSONNALISER TON PORTFOLIO
// =============================================================

export const profile = {
  name: "Leo Clemente",
  handle: "leoclemente",
  role: "Développeur",
  tagline:
    "Je pilote des projets de leur conception à leur réalisation, tout en développant des solutions web adaptées aux besoins.",
  email: "leocmt4@gmail.com",
  location: "France",
  since: "Depuis 2023",

  // Liens sociaux — laisse vide ("") pour cacher un lien
  socials: {
    github: "https://github.com/root0gama",
    instagram: "https://www.instagram.com/leocmt4/",
    twitter: "https://x.com/_00Keypass",
  },

  // Petite carte "Focus actuel"
  focus: {
    label: "En ce moment",
    title: "Refonte de mon portfolio",
    status: "en cours",
  },

  // Carte "Stack" — langages affichés dans le marquee vertical
  stack: ["Lua", "C", "HTML", "CSS", "JavaScript", "Node.js", "React", "Tailwind CSS"],

  // Carte "Ce que je fais" (grille de 6)
  services: [
    { icon: "code", name: "Développement", desc: "Sites & apps web sur mesure" },
    { icon: "manage", name: "Gestion", desc: "Suivi et pilotage de projet" },
    { icon: "integration", name: "Intégration", desc: "Du design au pixel près" },
    { icon: "perf", name: "Perf", desc: "Sites rapides et optimisés" },
    { icon: "model", name: "Modélisation", desc: "Bases de données & structures" },
    { icon: "comm", name: "Communication", desc: "Échanges clairs et réguliers" },
  ],

  // Petit paragraphe "À propos"
  about:
    "J'aime transformer des idées en projets concrets en accordant une attention " +
    "particulière à l'organisation, à la qualité et à l'expérience utilisateur.",

  // Aperçus (carrousel) — captures des différents projets
  gallery: [
    { src: "/projet-explore.png", label: "Forge · Explore" },
    { src: "/projet-talents.png", label: "Forge · Talents" },
    { src: "/kokwak-duel.png", label: "Kokwak · Duel Pokémon" },
    { src: "/kokwak-combat.png", label: "Kokwak · Combat" },
    { src: "/kokwak-capture.png", label: "Kokwak · Capture" },
  ],

  // Carte "Projets" — le 1er alimente la carte "à la une"
  projects: [
    {
      title: "Forge — Marketplace freelance",
      description:
        "Plateforme de freelancing sécurisée : paiements sous séquestre (escrow), " +
        "freelances vérifiés et litiges arbitrés sous 72 h. Interface premium, temps réel.",
      image: "/projet-marketplace.png",
      tags: ["TypeScript", "Next.js", "React", "Tailwind CSS", "Node.js", "PostgreSQL"],
    },
    {
      title: "Kokwak",
      description:
        "Bot Discord reprenant les mécaniques des jeux Pokémon officiels.",
      image: "/kokwak.png",
      link: "https://github.com/root0gama/autre-projet",
      tags: ["Discord", "Node.js"],
    },
  ],

  // Carte "Expériences"
  experiences: [
    {
      company: "Fall Out Community",
      role: "Chef de projet",
      description: "Gestion de projet au sein d'une communauté en ligne.",
    },
    {
      company: "Horses",
      role: "Développeur",
      description:
        "Réalisation d'une application mobile iOS (React Native) pour l'événement Horses 2025.",
    },
    {
      company: "Genius Corp",
      role: "Chef de projet",
      description:
        "Pilotage du développement de serveurs RP (jeu en ligne massivement multijoueur).",
    },
  ],
} as const;

export type Profile = typeof profile;
