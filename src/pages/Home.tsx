import Header from '../sections/Header';
import Hero from '../sections/Hero';
import ProblemSolution from '../sections/ProblemSolution';
import Packages from '../sections/Packages';
import TrustBar from '../sections/TrustBar';
import Projects from '../sections/Projects';
import Process from '../sections/Process';
import LeadCapture from '../sections/LeadCapture';
import Footer from '../sections/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import StickyCTA from '../components/StickyCTA';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ProblemSolution />
        <Packages />
        <TrustBar />
        <Projects />
        <Process />
        <LeadCapture />
      </main>
      <Footer />
      <WhatsAppButton />
      <StickyCTA />
    </div>
  );
}
