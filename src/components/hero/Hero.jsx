import './Hero.css';

function Hero() {
  return (
    <section className="hero">
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
              Your comprehensive solution for vulnerability assessment and security management. 
              Protect your digital assets with advanced threat detection and real-time monitoring.
            </p>
            <p className="hero-description">
              Stay ahead of cyber threats with our cutting-edge platform designed for modern security needs.
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

