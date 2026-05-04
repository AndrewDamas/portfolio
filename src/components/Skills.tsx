import {
  SiReact, SiTypescript, SiNextdotjs, SiTailwindcss, SiHtml5, SiCss,
  SiVite, SiRedux, SiNodedotjs, SiPython, SiExpress, SiFastapi,
  SiPostgresql, SiMongodb, SiGraphql, SiDocker, SiGit,
  SiGithub, SiLinux, SiVercel, SiFigma, SiJest, SiSupabase, SiMui,
} from 'react-icons/si';
import {VscAzure} from 'react-icons/vsc'
import { FiCode, FiClipboard, FiCheckSquare, FiFileText } from 'react-icons/fi';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import skills from '../data/skills';
import styles from './Skills.module.css';
import type {JSX} from "react";

type IconKey = string;

const iconMap: Record<IconKey, JSX.Element> = {
  react:      <SiReact />,
  typescript: <SiTypescript />,
  nextjs:     <SiNextdotjs />,
  tailwind:   <SiTailwindcss />,
  html:       <SiHtml5 />,
  css:        <SiCss />,
  vite:       <SiVite />,
  redux:      <SiRedux />,
  rtkquery:   <SiRedux />,
  nodejs:     <SiNodedotjs />,
  python:     <SiPython />,
  express:    <SiExpress />,
  fastapi:    <SiFastapi />,
  postgresql: <SiPostgresql />,
  mongodb:    <SiMongodb />,
  graphql:    <SiGraphql />,
  api:        <FiCode />,
  docker:     <SiDocker />,
  git:        <SiGit />,
  github:     <SiGithub />,
  linux:      <SiLinux />,
  vercel:     <SiVercel />,
  figma:      <SiFigma />,
  jest:       <SiJest />,
  azure:      <VscAzure />,
  supabase:   <SiSupabase />,
  mui:            <SiMui />,
  reacthookform:  <FiClipboard />,
  yup:            <FiCheckSquare />,
  reactpdf:       <FiFileText />,
};

export default function Skills() {
  const ref = useScrollAnimation<HTMLElement>();

  return (
    <section id="skills" className={`${styles.skills} section`} ref={ref}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label fade-up">Tech Stack</p>
          <h2 className="section-title fade-up">Skills &amp; Tools</h2>
          <p className={`section-subtitle fade-up ${styles.subtitle}`}>
            A curated set of technologies I reach for to build production-ready
            applications — frontend, backend, and everywhere in between.
          </p>
        </div>

        <div className={styles.categories}>
          {skills.map((group, gi) => (
            <div key={group.category} className={`${styles.categoryBlock} fade-up`} style={{ transitionDelay: `${gi * 80}ms` }}>
              <h3 className={styles.categoryName}>{group.category}</h3>
              <div className={styles.pills}>
                {group.skills.map(skill => (
                  <div key={skill.name} className={styles.pill}>
                    <span className={styles.pillIcon}>
                      {iconMap[skill.icon] ?? <FiCode />}
                    </span>
                    <span className={styles.pillName}>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
