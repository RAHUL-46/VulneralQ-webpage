import './Hero.css';

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-left">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="gradient-text">VulneralQ</span>
            </h1>
            <h2 className="hero-subtitle">
              Advanced Vulnerability Assessment & Security Management
            </h2>
            <p className="hero-description">
              Comprehensive vulnerability scanning, real-time threat detection, automated security management, and advanced analytics—all in one powerful platform.
            </p>
          </div>
          <div className="hero-buttons">
            <button className="btn-primary">Get Started</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-image-container">
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80" 
              alt="VulneralQ Security" 
              className="hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

