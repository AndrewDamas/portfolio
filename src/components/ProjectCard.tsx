import { FiExternalLink, FiGithub } from 'react-icons/fi';
import type { Project } from '../data/projects';
import styles from './ProjectCard.module.css';

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const { title, description, techStack, liveUrl, repoUrl, screenshotUrl } = project;

  return (
    <div className={styles.card}>
      {/* Screenshot / placeholder */}
      <div className={styles.imageWrapper}>
        {screenshotUrl ? (
          <img src={screenshotUrl} alt={`${title} screenshot`} className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span className={styles.placeholderText}>{title[0]}</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className={styles.overlay}>
          <h3 className={styles.overlayTitle}>{title}</h3>
          <p className={styles.overlayDesc}>{description}</p>
          <div className={styles.badges}>
            {techStack.map(tech => (
              <span key={tech} className={styles.badge}>{tech}</span>
            ))}
          </div>
          <div className={styles.overlayLinks}>
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={styles.overlayLink} aria-label="Live site">
                <FiExternalLink size={18} /> Live
              </a>
            )}
            {repoUrl && (
              <a href={repoUrl} target="_blank" rel="noopener noreferrer" className={styles.overlayLink} aria-label="Source code">
                <FiGithub size={18} /> Code
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Card footer (always visible) */}
      <div className={styles.footer}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.footerBadges}>
          {techStack.slice(0, 3).map(tech => (
            <span key={tech} className={styles.badge}>{tech}</span>
          ))}
          {techStack.length > 3 && (
            <span className={styles.badge}>+{techStack.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  );
}
