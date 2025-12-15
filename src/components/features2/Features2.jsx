import { useState, useEffect, useRef } from 'react';
import './Features2.css';

function Features2() {
  const [selectedFeature, setSelectedFeature] = useState(0);
  
  // Refs for scroll animations
  const headingRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const buttonsRef = useRef(null);
  const buttonsContainerRef = useRef(null);
  const buttonRefs = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAnimating, setIsAnimating] = useState({
    heading: false,
    image: false,
    content: false,
    buttons: false
  });

  const features = [
    {
      title: "Comprehensive Vulnerability Scanning",
      description: [
        "Identify and assess security vulnerabilities across your entire infrastructure with our advanced scanning technology. Get real-time insights into potential threats and security gaps.",
        "Our intelligent system continuously monitors your assets, providing detailed reports and actionable recommendations to strengthen your security posture."
      ],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop&q=80",
      buttonText: "Vulnerability Scanning"
    },
    {
      title: "Real-Time Threat Detection",
      description: [
        "Stay protected with 24/7 monitoring and instant alerts when threats are detected. Our advanced AI-powered system analyzes patterns and identifies anomalies in real-time.",
        "Get immediate notifications about critical vulnerabilities and potential security breaches, allowing you to respond quickly and effectively."
      ],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&q=80",
      buttonText: "Threat Detection"
    },
    {
      title: "Automated Security Management",
      description: [
        "Streamline your security operations with automated workflows and intelligent remediation suggestions. Reduce manual effort and improve response times.",
        "Our platform integrates seamlessly with your existing tools and infrastructure, providing a unified view of your security landscape."
      ],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80",
      buttonText: "Security Management"
    },
    {
      title: "Advanced Reporting & Analytics",
      description: [
        "Gain deep insights into your security posture with comprehensive reports and analytics. Track trends, measure improvements, and make data-driven decisions.",
        "Customize reports to meet your organization's needs and share them with stakeholders to demonstrate compliance and security improvements."
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
      buttonText: "Reporting & Analytics"
    }
  ];

  const handleFeatureSelect = (index) => {
    if (index === selectedFeature) return;
    
    // Start transition
    setIsTransitioning(true);
    
    // After fade out, change content and fade in
    setTimeout(() => {
      setSelectedFeature(index);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300); // Half of transition duration
  };

  // Update sliding indicator position
  useEffect(() => {
    const updateIndicatorPosition = () => {
      if (buttonRefs.current[selectedFeature] && buttonsContainerRef.current) {
        const activeButton = buttonRefs.current[selectedFeature];
        const container = buttonsContainerRef.current;
        
        const buttonRect = activeButton.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        const left = buttonRect.left - containerRect.left;
        const width = buttonRect.width;
        
        setIndicatorStyle({
          left: `${left}px`,
          width: `${width}px`,
          opacity: 1
        });
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(updateIndicatorPosition, 10);
    
    // Update on window resize
    window.addEventListener('resize', updateIndicatorPosition);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateIndicatorPosition);
    };
  }, [selectedFeature]);

  // Scroll animation observer
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
    if (imageRef.current) observer.observe(imageRef.current);
    if (contentRef.current) observer.observe(contentRef.current);
    if (buttonsRef.current) observer.observe(buttonsRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Initialize animations on mount
  useEffect(() => {
    setIsAnimating(prev => ({ ...prev, image: true, content: true }));
  }, []);

  const currentFeatureData = features[selectedFeature];

  return (
    <section id="features2" className="features2">
      <div className="features2-container">
        <h2 
          ref={headingRef}
          data-animate="heading"
          className={`features2-heading ${isAnimating.heading ? 'animate-fade-in-up' : ''}`}
        >
          Our Features
        </h2>
        
        <div className="features2-content">
          {/* Image at top - centered */}
          <div 
            ref={imageRef}
            data-animate="image"
            className={`features2-image-container ${isAnimating.image ? 'animate-fade-in-up' : ''} ${isTransitioning ? 'fade-out' : 'fade-in'}`}
          >
            <img 
              src={currentFeatureData.image} 
              alt={currentFeatureData.title} 
              className="features2-image"
            />
          </div>
          
          {/* Description below image - centered */}
          <div 
            ref={contentRef}
            data-animate="content"
            className={`features2-text-content ${isAnimating.content ? 'animate-fade-in-up' : ''} ${isTransitioning ? 'fade-out' : 'fade-in'}`}
          >
            <h3 className="features2-title">{currentFeatureData.title}</h3>
            {currentFeatureData.description.map((desc, index) => (
              <p key={index} className="features2-description">
                {desc}
              </p>
            ))}
          </div>
          
          {/* Four cylinder-shaped buttons at bottom - centered */}
          <div 
            ref={buttonsRef}
            data-animate="buttons"
            className="features2-buttons-wrapper"
          >
            <div 
              ref={buttonsContainerRef}
              className="features2-buttons"
            >
              {/* Sliding indicator */}
              <div 
                className="features2-slider-indicator"
                style={indicatorStyle}
              />
              
              {features.map((feature, index) => (
                <button
                  key={index}
                  ref={(el) => (buttonRefs.current[index] = el)}
                  className={`features2-button ${selectedFeature === index ? 'active' : ''}`}
                  onClick={() => handleFeatureSelect(index)}
                  aria-label={`Select ${feature.buttonText}`}
                >
                  {feature.buttonText}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features2;

