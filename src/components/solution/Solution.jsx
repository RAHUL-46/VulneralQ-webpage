import { useState, useEffect, useRef } from 'react';
import './Solution.css';

function Solution() {
  const [selectedProblem, setSelectedProblem] = useState(0);
  
  // Refs for scroll animations
  const headingRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState({
    heading: false,
    image: false,
    content: false
  });

  const problems = [
    {
      problem: "Security Vulnerabilities",
      title: "Security Vulnerabilities in Cloud Infrastructure",
      description: [
        "Organizations face increasing security threats in their cloud environments, with vulnerabilities often going undetected until it's too late. Common issues include misconfigured security groups, exposed sensitive data.",
        "Our solution provides comprehensive vulnerability scanning and real-time threat detection to identify and address these security gaps before they can be exploited by malicious actors."
      ],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&q=80"
    },
    {
      problem: "Compliance & Regulatory Challenges",
      title: "Meeting Compliance Requirements",
      description: [
        "Many organizations struggle to maintain compliance with industry regulations like GDPR, HIPAA, and SOC 2. The complexity of tracking security controls and generating compliance reports can be overwhelming.",
        "VulneralQ automates compliance monitoring and reporting, ensuring your infrastructure meets all regulatory requirements with detailed audit trails and automated compliance checks."
      ],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop&q=80"
    },
    {
      problem: "Lack of Visibility",
      title: "Limited Security Visibility",
      description: [
        "Without proper monitoring tools, organizations have limited visibility into their security posture. This makes it difficult to identify threats, track security improvements, and make informed decisions.",
        "Our platform provides comprehensive dashboards and analytics that give you complete visibility into your security landscape, with real-time alerts and detailed insights into potential threats."
      ],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80"
    },
    {
      problem: "Manual Security Management",
      title: "Inefficient Security Operations",
      description: [
        "Manual security management processes are time-consuming, error-prone, and don't scale well. Security teams spend too much time on repetitive tasks instead of focusing on strategic security initiatives.",
        "VulneralQ automates routine security tasks, provides intelligent remediation suggestions, and streamlines workflows to help your security team work more efficiently and effectively."
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80"
    }
  ];

  const handleProblemSelect = (index) => {
    setSelectedProblem(index);
  };

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

    return () => {
      observer.disconnect();
    };
  }, []);

  // Reset image and content animations when problem changes
  useEffect(() => {
    setIsAnimating(prev => ({ ...prev, image: false, content: false }));
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsAnimating(prev => ({ ...prev, image: true, content: true }));
      });
    });
  }, [selectedProblem]);

  const currentProblemData = problems[selectedProblem];

  return (
    <section id="solutions" className="solution">
      <div className="solution-container">
        <h2 
          ref={headingRef}
          data-animate="heading"
          className={`solution-heading ${isAnimating.heading ? 'animate-fade-in-up' : ''}`}
        >
          Our Solutions
        </h2>
        
        <div className="solution-content">
          <div className="solution-left">
            <div className="problem-buttons">
              {problems.map((problem, index) => (
                <button
                  key={index}
                  className={`problem-button ${selectedProblem === index ? 'active' : ''}`}
                  onClick={() => handleProblemSelect(index)}
                  aria-label={`Select ${problem.problem}`}
                >
                  {problem.problem}
                </button>
              ))}
            </div>
          </div>
          
          <div className="solution-right">
            <div 
              ref={imageRef}
              data-animate="image"
              className={`solution-image-container ${isAnimating.image ? 'animate-fade-in-right' : ''}`}
            >
              <img 
                src={currentProblemData.image} 
                alt={currentProblemData.title} 
                className="solution-image"
              />
            </div>
            
            <div 
              ref={contentRef}
              data-animate="content"
              className={`solution-text-content ${isAnimating.content ? 'animate-fade-in-right' : ''}`}
            >
              <h3 className="solution-title">{currentProblemData.title}</h3>
              {currentProblemData.description.map((desc, index) => (
                <p key={index} className="solution-description">
                  {desc}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Solution;

