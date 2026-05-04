import { useTheme } from './hooks/useTheme';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import HireMe from './components/HireMe';
import Footer from './components/Footer';

export default function App() {
  const [theme, toggleTheme] = useTheme();

  return (
    <>
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <HireMe />
      </main>
      <Footer />
    </>
  );
}
