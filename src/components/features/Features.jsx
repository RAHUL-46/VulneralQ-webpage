import { useState, useEffect, useRef } from 'react';
import './Features.css';

function Features() {
  const [currentFeature, setCurrentFeature] = useState(0);
  // const timerRef = useRef(null); // For auto-advance functionality
  
  // Refs for scroll animations
  const headingRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState({
    heading: false,
    image: false,
    content: false
  });

  const features = [
    {
      title: "Comprehensive Vulnerability Scanning",
      description: [
        "Identify and assess security vulnerabilities across your entire infrastructure with our advanced scanning technology. Get real-time insights into potential threats and security gaps.",
        "Our intelligent system continuously monitors your assets, providing detailed reports and actionable recommendations to strengthen your security posture."
      ],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop&q=80"
    },
    {
      title: "Real-Time Threat Detection",
      description: [
        "Stay protected with 24/7 monitoring and instant alerts when threats are detected. Our advanced AI-powered system analyzes patterns and identifies anomalies in real-time.",
        "Get immediate notifications about critical vulnerabilities and potential security breaches, allowing you to respond quickly and effectively."
      ],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&q=80"
    },
    {
      title: "Automated Security Management",
      description: [
        "Streamline your security operations with automated workflows and intelligent remediation suggestions. Reduce manual effort and improve response times.",
        "Our platform integrates seamlessly with your existing tools and infrastructure, providing a unified view of your security landscape."
      ],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80"
    },
    {
      title: "Advanced Reporting & Analytics",
      description: [
        "Gain deep insights into your security posture with comprehensive reports and analytics. Track trends, measure improvements, and make data-driven decisions.",
        "Customize reports to meet your organization's needs and share them with stakeholders to demonstrate compliance and security improvements."
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80"
    }
  ];

  const handlePrevious = () => {
    if (currentFeature > 0) {
      setCurrentFeature(currentFeature - 1);
    }
  };

  const handleNext = () => {
    if (currentFeature < features.length - 1) {
      setCurrentFeature(currentFeature + 1);
    }
  };

  // Scroll animation observer - triggers every time elements enter viewport
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const elementId = entry.target.getAttribute('data-animate');
        if (entry.isIntersecting) {
          // Reset animation state first, then trigger animation
          setIsAnimating(prev => ({ ...prev, [elementId]: false }));
          // Force reflow and then trigger animation
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setIsAnimating(prev => ({ ...prev, [elementId]: true }));
            });
          });
        } else {
          // Reset when leaving viewport
          setIsAnimating(prev => ({ ...prev, [elementId]: false }));
        }
      });
    }, observerOptions);

    // Observe elements
    if (headingRef.current) observer.observe(headingRef.current);
    if (imageRef.current) observer.observe(imageRef.current);
    if (contentRef.current) observer.observe(contentRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Auto-advance feature after 2 seconds (commented out for now)
  // useEffect(() => {
  //   // Clear any existing timer
  //   if (timerRef.current) {
  //     clearTimeout(timerRef.current);
  //   }

  //   // Only auto-advance if not on the last feature
  //   if (currentFeature < features.length - 1) {
  //     timerRef.current = setTimeout(() => {
  //       setCurrentFeature(currentFeature + 1);
  //     }, 5000);
  //   }

  //   // Cleanup function to clear timer on unmount or when currentFeature changes
  //   return () => {
  //     if (timerRef.current) {
  //       clearTimeout(timerRef.current);
  //     }
  //   };
  // }, [currentFeature, features.length]);

  const currentFeatureData = features[currentFeature];
  const isFirstFeature = currentFeature === 0;
  const isLastFeature = currentFeature === features.length - 1;

  return (
    <section id="features" className="features">
      <div className="features-container">
        <h2 
          ref={headingRef}
          data-animate="heading"
          className={`features-heading ${isAnimating.heading ? 'animate-fade-in-up' : ''}`}
        >
          VulneralQ Key Features
        </h2>
        
        <div className="features-content">
          <div className="features-left">
            <div 
              ref={imageRef}
              data-animate="image"
              className={`features-image-container ${isAnimating.image ? 'animate-fade-in-left' : ''}`}
            >
              <img 
                src={currentFeatureData.image} 
                alt={currentFeatureData.title} 
                className="features-image"
              />
            </div>
          </div>
          
          <div className="features-right">
            <div 
              ref={contentRef}
              data-animate="content"
              className={`feature-content ${isAnimating.content ? 'animate-fade-in-right' : ''}`}
            >
              <h3 className="feature-title">{currentFeatureData.title}</h3>
              {currentFeatureData.description.map((desc, index) => (
                <p key={index} className="feature-description">
                  {desc}
                </p>
              ))}
            </div>
            
            <div className="feature-navigation">
              <button 
                className={`nav-arrow nav-arrow-left ${isFirstFeature ? 'disabled' : ''}`}
                onClick={handlePrevious}
                disabled={isFirstFeature}
                aria-label="Previous feature"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className={`nav-arrow nav-arrow-right ${isLastFeature ? 'disabled' : ''}`}
                onClick={handleNext}
                disabled={isLastFeature}
                aria-label="Next feature"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;

