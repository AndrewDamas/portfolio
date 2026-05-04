import { FiDownload } from 'react-icons/fi';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import styles from './About.module.css';

export default function About() {
  const ref = useScrollAnimation<HTMLElement>();

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
                Detroit, MI with over 3 years of experience building web applications that
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
                <span className={styles.num}>3+</span>
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
              <a href="/resume.pdf" download className="btn btn-secondary">
                <FiDownload size={16} /> Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
