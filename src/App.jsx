import './App.css';
import Hero from './components/hero/Hero';
import Features from './components/features/Features';
import Features2 from './components/features2/Features2';
import Providers from './components/providers/Providers';
import Banner from './components/banner/Banner';
import Pricing from './components/pricing/Pricing';
import Solution from './components/solution/Solution';

function App() {
  return (
    <>
      <div className="content">
        <Hero />
        <Features />
        <Providers />
        <Banner />
        <Solution />
        <Pricing />
        <Features2 />
        
      </div>
    </>
  );
}
export default App ;
