import CanvasContainer from '@/components/CanvasContainer';
import Experience from '@/components/Experience';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main style={{ width: '100%' }}>
      <CanvasContainer>
        <Experience />
      </CanvasContainer>

      <Hero />
      <About />
      <Skills />
      <Services />
      <Projects />
      <Contact />
    </main>
  );
}
