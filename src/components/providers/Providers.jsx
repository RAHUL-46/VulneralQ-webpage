import { useEffect, useRef, useState } from 'react';
import './Providers.css';

function Providers() {
  const headingRef = useRef(null);
  const cardsRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState({
    heading: false,
    cards: false
  });

  const providers = [
    {
      name: 'Microsoft Azure',
      description: 'Comprehensive security scanning and vulnerability assessment for your Azure infrastructure. Monitor and protect your cloud resources with real-time threat detection.',
      logo: '/Azure.png',
      color: '#0078d4'
    },
    {
      name: 'Amazon Web Services',
      description: 'Full support for AWS services including EC2, S3, RDS, and more. Get complete visibility into your AWS security posture with automated scanning.',
      logo: '/AWS.png',
      color: '#FF9900'
    },
    {
      name: 'Kubernetes',
      description: 'Comprehensive security scanning for Kubernetes clusters and containerized workloads. Monitor and protect your container orchestration platform with advanced vulnerability detection.',
      logo: '/Kubernetes.png',
      color: '#326CE5'
    }
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const elementId = entry.target.getAttribute('data-animate');
        if (entry.isIntersecting) {
          setIsAnimating(prev => ({ ...prev, [elementId]: false }));
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setIsAnimating(prev => ({ ...prev, [elementId]: true }));
            });
          });
        } else {
          setIsAnimating(prev => ({ ...prev, [elementId]: false }));
        }
      });
    }, observerOptions);

    if (headingRef.current) observer.observe(headingRef.current);
    if (cardsRef.current) observer.observe(cardsRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="providers" className="providers">
      <div className="providers-container">
        <h2 
          ref={headingRef}
          data-animate="heading"
          className={`providers-heading ${isAnimating.heading ? 'animate-fade-in-up' : ''}`}
        >
          Supported Cloud Providers 
        </h2>
        <p className={`providers-subtitle ${isAnimating.heading ? 'animate-fade-in-up' : ''}`}>
          VulneralQ seamlessly integrates with leading cloud platforms to protect your infrastructure
        </p>
        
        <div 
          ref={cardsRef}
          data-animate="cards"
          className={`providers-cards ${isAnimating.cards ? 'animate-fade-in-up' : ''}`}
        >
          {providers.map((provider, index) => (
            <div 
              key={provider.name} 
              className="provider-card"
              style={{ '--provider-color': provider.color }}
            >
              <div className="provider-card-logo">
                <div className="provider-logo-container">
                  <img 
                    src={provider.logo} 
                    alt={`${provider.name} logo`}
                    className="provider-logo"
                  />
                </div>
              </div>
              <div className="provider-card-content">
                <h3 className="provider-name">{provider.name}</h3>
                <p className="provider-description">{provider.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Providers;

