import './Navbar.css';

function Navbar() {
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-text">VulneralQ</span>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="#home" className="nav-link" onClick={(e) => handleSmoothScroll(e, 'home')}>Home</a>
          </li>
          <li className="nav-item">
            <a href="#features" className="nav-link" onClick={(e) => handleSmoothScroll(e, 'features')}>Features</a>
          </li>
          <li className="nav-item">
            <a href="#solutions" className="nav-link">Solutions</a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-link">About</a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-link">Contact</a>
          </li>
        </ul>
        <div className="nav-cta">
          <button className="cta-button">Get Started</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

