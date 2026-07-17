import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Nom du dépôt GitHub — sert de basePath pour GitHub Pages
// (https://<user>.github.io/<repo>/). Uniquement appliqué en CI pour
// ne pas casser le dev local (localhost:3000 reste à la racine).
const repo = "portfolio";
const isCI = process.env.GITHUB_ACTIONS === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export statique -> dossier `out/`, hébergeable tel quel par GitHub Pages
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isCI ? `/${repo}` : "",
  assetPrefix: isCI ? `/${repo}/` : "",
  // Exposé au client pour préfixer les images de public/ (next/image ne le fait pas)
  env: {
    NEXT_PUBLIC_BASE_PATH: isCI ? `/${repo}` : "",
  },
  // Fixe la racine sur ce dossier (un autre lockfile existe dans le dossier parent)
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
