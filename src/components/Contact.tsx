import { FiMail, FiMapPin, FiLinkedin } from 'react-icons/fi';
import { SiUpwork } from 'react-icons/si';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import socials from '../data/socials';
import styles from './Contact.module.css';

const details = [
  {
    icon: <FiMail size={20} />,
    label: 'Email',
    value: 'andrew@andrewdamas.dev',
    href: 'mailto:andrew@andrewdamas.dev',
  },
  {
    icon: <FiMapPin size={20} />,
    label: 'Location',
    value: 'Detroit, MI — available remotely worldwide',
    href: null,
  },
  {
    icon: <FiLinkedin size={20} />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/andrewdamavoletes',
    href: socials.linkedin,
  },
  {
    icon: <SiUpwork size={18} />,
    label: 'Upwork',
    value: 'upwork.com/fl/andrewdamavoletes',
    href: socials.upwork,
  },
];

export default function Contact() {
  const ref = useScrollAnimation<HTMLElement>();

  return (
    <section id="contact" className={`${styles.contact} section`} ref={ref}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.left}>
            <p className="section-label fade-up">Get In Touch</p>
            <h2 className="section-title fade-up">
              Let's build something<br />
              <em>worth building</em>
            </h2>
            <p className={`section-subtitle fade-up ${styles.body}`}>
              Whether you have a project in mind, a question to ask, or just
              want to say hello — my inbox is always open.
            </p>
          </div>

          <div className={styles.right}>
            {details.map((d, i) => (
              <div
                key={d.label}
                className={`${styles.detail} fade-up`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className={styles.detailIcon}>{d.icon}</span>
                <div className={styles.detailText}>
                  <span className={styles.detailLabel}>{d.label}</span>
                  {d.href ? (
                    <a href={d.href} target="_blank" rel="noopener noreferrer" className={styles.detailValue}>
                      {d.value}
                    </a>
                  ) : (
                    <span className={styles.detailValue}>{d.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
