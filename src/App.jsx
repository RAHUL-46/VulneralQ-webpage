import './App.css';
import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero';
import Features from './components/features/Features';

function App() {
  return (
    <>
      <Navbar />
      <div className="content">
        <Hero />
        <Features />
      </div>
    </>
  );
}

export default App;
