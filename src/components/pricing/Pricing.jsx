import { useEffect, useRef, useState } from 'react';
import './Pricing.css';

function Pricing() {
  const headingRef = useRef(null);
  const cardsRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState({
    heading: false,
    cards: false
  });

  const pricingPlans = [
    {
      name: 'Basic',
      price: '$29',
      period: '/month',
      description: 'Perfect for small teams getting started',
      features: [
        'Up to 10 assets',
        'Basic vulnerability scanning',
        'Email notifications',
        'Weekly reports',
        'Community support',
        'Basic integrations'
      ],
      popular: false,
      gradient: 'linear-gradient(135deg, #818cf8 0%, #60a5fa 100%)'
    },
    {
      name: 'Professional',
      price: '$99',
      period: '/month',
      description: 'Ideal for growing businesses',
      features: [
        'Up to 100 assets',
        'Advanced vulnerability scanning',
        'Real-time alerts',
        'Daily reports',
        'Priority support',
        'Custom integrations'
      ],
      popular: true,
      gradient: 'linear-gradient(135deg, #818cf8 0%, #60a5fa 50%, #4f46e5 100%)'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Tailored solutions for large organizations',
      features: [
        'Unlimited assets',
        'Enterprise-grade scanning',
        '24/7 monitoring',
        'Custom reporting',
        'Dedicated support',
        'Advanced integrations'
      ],
      popular: false,
      gradient: 'linear-gradient(135deg, #4f46e5 0%, #818cf8 100%)'
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
    <section id="pricing" className="pricing">
      <div className="pricing-container">
        <h2 
          ref={headingRef}
          data-animate="heading"
          className={`pricing-heading ${isAnimating.heading ? 'animate-fade-in-up' : ''}`}
        >
          Choose Your Plan
        </h2>
        <p className={`pricing-subtitle ${isAnimating.heading ? 'animate-fade-in-up' : ''}`}>
          Flexible pricing options designed to scale with your security needs
        </p>
        
        <div 
          ref={cardsRef}
          data-animate="cards"
          className={`pricing-cards ${isAnimating.cards ? 'animate-fade-in-up' : ''}`}
        >
          {pricingPlans.map((plan, index) => (
            <div 
              key={plan.name} 
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
              style={{ 
                animationDelay: `${index * 0.15}s`,
                '--card-gradient': plan.gradient
              }}
            >
              {plan.popular && (
                <div className="popular-badge">
                  <span>Most Popular</span>
                </div>
              )}
              
              <div className="pricing-card-header">
                <h3 className="pricing-plan-name">{plan.name}</h3>
                <div className="pricing-price-container">
                  <span className="pricing-price">{plan.price}</span>
                  {plan.period && <span className="pricing-period">{plan.period}</span>}
                </div>
                <p className="pricing-description">{plan.description}</p>
              </div>

              <div className="pricing-card-body">
                <ul className="pricing-features">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="pricing-feature">
                      <svg 
                        className="feature-icon" 
                        width="18" 
                        height="18" 
                        viewBox="0 0 20 20" 
                        fill="none"
                      >
                        <path 
                          d="M16.667 5L7.5 14.167 3.333 10" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pricing-card-footer">
                <button className={`pricing-button ${plan.popular ? 'popular-button' : ''}`}>
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;

