import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import UseCases from './components/sections/UseCases';
import Testimonials from './components/sections/Testimonials';
import Stats from './components/sections/Stats';
import Providers from './components/sections/Providers';
import CTA from './components/sections/CTA';

function App() {
  return (
    <div className="min-h-screen w-full bg-[#030921]">
      <Header />
      <main className="w-full">
        <Hero />
        <Stats />
        <Features />
        <UseCases />
        <Providers />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
