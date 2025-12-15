import { useEffect, useRef, useState } from 'react';
import './Banner.css';

function Banner() {
  const bannerRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsAnimating(false);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setIsAnimating(true);
            });
          });
        } else {
          setIsAnimating(false);
        }
      });
    }, observerOptions);

    if (bannerRef.current) observer.observe(bannerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="banner" className="banner" ref={bannerRef}>
      <div className="banner-container">
        <div className={`banner-content ${isAnimating ? 'animate-fade-in-up' : ''}`}>
          <div className="banner-left">
            <h2 className="banner-title">
              Ready to Secure Your Infrastructure?
            </h2>
            <p className="banner-description">
              Experience the power of VulneralQ with a live demo. See how our platform can protect your cloud infrastructure with real-time vulnerability scanning and automated security management.
            </p>
            <div className="banner-features">
              <div className="banner-feature">
                <svg className="banner-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>No Credit Card Required</span>
              </div>
              <div className="banner-feature">
                <svg className="banner-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Full Access to Features</span>
              </div>
              <div className="banner-feature">
                <svg className="banner-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Expert Support Included</span>
              </div>
            </div>
          </div>
          <div className="banner-right">
            <div className="banner-buttons">
              <button className="banner-btn-demo">Request Demo</button>
              <button className="banner-btn-secondary">Contact Sales</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;

