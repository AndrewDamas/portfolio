import { FiLinkedin, FiHeart } from 'react-icons/fi';
import { SiUpwork } from 'react-icons/si';
import socials from '../data/socials';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>
          © {year} <span className={styles.name}>Andrew Damas</span>. Built with{' '}
          <FiHeart size={13} className={styles.heart} /> and a lot of coffee.
        </p>
        <div className={styles.links}>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={styles.link}
          >
            <FiLinkedin size={17} />
          </a>
          <a
            href={socials.upwork}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Upwork"
            className={styles.link}
          >
            <SiUpwork size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
