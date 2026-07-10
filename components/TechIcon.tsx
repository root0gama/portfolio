import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiPrisma,
  SiGit,
  SiGithub,
  SiFigma,
  SiHtml5,
  SiCss,
  SiPython,
  SiDocker,
  SiGraphql,
  SiRedux,
  SiVuedotjs,
  SiSass,
  SiVercel,
  SiFramer,
  SiThreedotjs,
  SiExpress,
  SiSupabase,
  SiFirebase,
} from "react-icons/si";
import { TbCode } from "react-icons/tb";

const ICONS: Record<string, IconType> = {
  typescript: SiTypescript,
  ts: SiTypescript,
  javascript: SiJavascript,
  js: SiJavascript,
  react: SiReact,
  nextjs: SiNextdotjs,
  next: SiNextdotjs,
  nodejs: SiNodedotjs,
  node: SiNodedotjs,
  tailwindcss: SiTailwindcss,
  tailwind: SiTailwindcss,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  mysql: SiMysql,
  mongodb: SiMongodb,
  mongo: SiMongodb,
  prisma: SiPrisma,
  git: SiGit,
  github: SiGithub,
  figma: SiFigma,
  html: SiHtml5,
  html5: SiHtml5,
  css: SiCss,
  css3: SiCss,
  python: SiPython,
  docker: SiDocker,
  graphql: SiGraphql,
  redux: SiRedux,
  vue: SiVuedotjs,
  vuejs: SiVuedotjs,
  sass: SiSass,
  scss: SiSass,
  vercel: SiVercel,
  framer: SiFramer,
  framermotion: SiFramer,
  motion: SiFramer,
  threejs: SiThreedotjs,
  express: SiExpress,
  expressjs: SiExpress,
  supabase: SiSupabase,
  firebase: SiFirebase,
};

function normalize(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function TechIcon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[normalize(name)] ?? TbCode;
  return <Icon className={className} aria-hidden />;
}
