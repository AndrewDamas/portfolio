import { useState, useEffect } from 'react';
import { FiLinkedin, FiMenu, FiX } from 'react-icons/fi';
import { SiUpwork } from 'react-icons/si';
import ThemeToggle from './ThemeToggle';
import socials from '../data/socials';
import styles from './Nav.module.css';

interface Props {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
  { label: 'Hire Me', href: '#hire' },
];

export default function Nav({ theme, onToggleTheme }: Readonly<Props>) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <a
            href="#hero"
            className={styles.logo}
            onClick={e => { e.preventDefault(); handleNavClick('#hero'); }}
          >
            Andrew Damas
          </a>

          <ul className={styles.links}>
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={e => { e.preventDefault(); handleNavClick(link.href); }}
                  className={link.label === 'Hire Me' ? styles.hireCta : styles.link}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
              aria-label="LinkedIn"
            >
              <FiLinkedin size={18} />
            </a>
            <a
              href={socials.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
              aria-label="Upwork"
            >
              <SiUpwork size={16} />
            </a>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}>
        <ul className={styles.drawerLinks}>
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={e => { e.preventDefault(); handleNavClick(link.href); }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.drawerSocials}>
          <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FiLinkedin size={20} />
          </a>
          <a href={socials.upwork} target="_blank" rel="noopener noreferrer" aria-label="Upwork">
            <SiUpwork size={18} />
          </a>
        </div>
      </div>
      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}
    </>
  );
}
