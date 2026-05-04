import { FiPackage } from 'react-icons/fi';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import projects from '../data/projects';
import ProjectCard from './ProjectCard';
import styles from './Projects.module.css';

export default function Projects() {
  const ref = useScrollAnimation<HTMLElement>();

  return (
    <section id="projects" className={`${styles.projects} section`} ref={ref}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label fade-up">Portfolio</p>
          <h2 className="section-title fade-up">Selected Projects</h2>
          <p className={`section-subtitle fade-up`}>
            A handful of things I've built — from side experiments to shipped
            products. Each one taught me something new.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className={`${styles.empty} fade-up`}>
            <div className={styles.emptyIcon}>
              <FiPackage size={48} />
            </div>
            <h3 className={styles.emptyTitle}>Projects coming soon</h3>
            <p className={styles.emptyText}>
              I'm currently curating my best work to showcase here. Check back
              shortly — or reach out if you'd like to see examples directly.
            </p>
          </div>
        ) : (
          <div className={styles.grid}>
            {projects.map((project, i) => (
              <div
                key={project.title}
                className="fade-up"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
