import { FiDownload } from 'react-icons/fi';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import styles from './About.module.css';

const EXPERIENCE_START = new Date(2022, 6, 1); // July 2022 (month is 0-indexed)

function getYearsOfExperience(from: Date = EXPERIENCE_START): number {
  const now = new Date();
  let years = now.getFullYear() - from.getFullYear();
  const monthDiff = now.getMonth() - from.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < from.getDate())) {
    years--;
  }
  return Math.max(0, years);
}

export default function About() {
  const ref = useScrollAnimation<HTMLElement>();
  const yearsExperience = getYearsOfExperience();

  return (
    <section id="about" className={`${styles.about} section`} ref={ref}>
      <div className="container">
        <div className={styles.grid}>
          {/* Photo placeholder */}
          <div className={`${styles.photoCol} fade-up`}>
            <div className={styles.photoFrame}>
              <div className={styles.photoPlaceholder}>
                <img src="/avatar.jpeg" alt="Andrew Damas" />
              </div>
              <div className={styles.photoAccent} />
            </div>
          </div>

          {/* Bio */}
          <div className={styles.bioCol}>
            <p className={`section-label fade-up`}>About Me</p>
            <h2 className={`section-title fade-up`}>
              Turning ideas into<br />
              <em>living, breathing</em> products
            </h2>

            <div className={`${styles.bio} fade-up`}>
              <p>
                Hey there! I'm <strong>Andrew Damas</strong> — a full-stack developer based in
                Detroit, MI with over {yearsExperience} years of experience building web applications that
                people actually enjoy using. I care deeply about the craft: clean code,
                thoughtful UX, and software that scales gracefully.
              </p>
              <p>
                My background spans everything from fast-loading React frontends to
                resilient Node and C# .NET backends, cloud infrastructure on Azure, and
                everything in between.
              </p>
              <p>
                When I'm not coding, you'll find me playing music or playing with my daughter.
                I believe good software is a lot like good music — it takes patience,
                attention to detail, and a little bit of love.
              </p>
            </div>

            <div className={`${styles.highlights} fade-up`}>
              <div className={styles.highlight}>
                <span className={styles.num}>{yearsExperience}+</span>
                <span className={styles.label}>Years Experience</span>
              </div>
              {/*<div className={styles.highlight}>*/}
              {/*  <span className={styles.num}>40+</span>*/}
              {/*  <span className={styles.label}>Projects Shipped</span>*/}
              {/*</div>*/}
              {/*<div className={styles.highlight}>*/}
              {/*  <span className={styles.num}>12</span>*/}
              {/*  <span className={styles.label}>Happy Clients</span>*/}
              {/*</div>*/}
            </div>

            <div className={`${styles.actions} fade-up`}>
              <a href="/AndrewDamavoletesResume.pdf" download className="btn btn-secondary">
                <FiDownload size={16} /> Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
