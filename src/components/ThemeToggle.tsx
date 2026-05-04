import { BsSun, BsMoon } from 'react-icons/bs';
import styles from './ThemeToggle.module.css';

interface Props {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: Props) {
  return (
    <button
      className={styles.toggle}
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className={`${styles.track} ${theme === 'dark' ? styles.dark : ''}`}>
        <span className={styles.thumb}>
          {theme === 'light' ? <BsSun size={11} /> : <BsMoon size={11} />}
        </span>
      </span>
    </button>
  );
}
