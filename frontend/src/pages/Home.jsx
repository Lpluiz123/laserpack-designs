import Hero from '../components/Hero';
import BenefitsSecion from '../sections/BenefitsSection';
import ProblemSection from '../sections/ProblemSection';
import SolutionSection from '../sections/SoluctionSection';
import StickyCTA from '../components/StickyCTA';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <main className="bg-slate-50 min-h-screen">
      {/* O componente Hero deve conter o título principal de alto impacto */}
      <Hero />
      <BenefitsSecion />
      <ProblemSection />
      <SolutionSection />
      <StickyCTA />
      <Footer />
    </main>
  );
};

export default Home;