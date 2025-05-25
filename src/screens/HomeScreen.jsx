import React from 'react';
import HeroImage from '../assets/Group_477.png'; // ✅ Correct image import

const HeroSection = () => {
  return (
    <>
      {/* Embedded CSS */}
      <style>{`
        .hero-container {
          font-family: 'Poppins', sans-serif;
          color: #1C163F;
          background-color: #fff;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 48px;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-box {
          background-color: #1C163F;
          color: #fff;
          font-weight: bold;
          border-radius: 8px;
          padding: 6px 12px;
        }

        .logo-text {
          font-size: 18px;
          font-weight: 600;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nav-links a {
          text-decoration: none;
          color: #1C163F;
          font-weight: 500;
          font-size: 14px;
        }

        .appointment-button {
          background-color: #1C163F;
          color: #fff;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        .hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 48px;
          gap: 48px;
        }

        .text-section {
          max-width: 50%;
        }

        .hero-title {
          font-size: 48px;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 24px;
        }

        .accent-text {
          font-weight: 800;
          color: #1C163F;
        }

        .subtitle {
          font-size: 16px;
          color: #666;
          margin-bottom: 24px;
        }

        .cta-button {
          background-color: #1C163F;
          color: #fff;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        .image-section {
          max-width: 50%;
        }

        .hero-image {
          width: 100%;
          border-radius: 16px;
        }

        @media (max-width: 768px) {
          .hero {
            flex-direction: column;
            text-align: center;
          }

          .text-section,
          .image-section {
            max-width: 100%;
          }
        }

        /* Animation Styles */
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInRight {
          0% {
            opacity: 0;
            transform: translateX(40px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .fade-in-up {
          animation: fadeInUp 1s ease forwards;
          opacity: 0;
        }

        .fade-in-right {
          animation: fadeInRight 1s ease forwards;
          opacity: 0;
        }

        .delay-1 {
          animation-delay: 0.3s;
        }

        .delay-2 {
          animation-delay: 0.6s;
        }

        .delay-3 {
          animation-delay: 0.9s;
        }

        .delay-4 {
          animation-delay: 1.2s;
        }
      `}</style>

      {/* Component Markup */}
      <div className="hero-container">
        <nav className="navbar">
          <div className="logo-container">
            <div className="logo-box">H</div>
            <span className="logo-text">Haus Salon</span>
          </div>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact">Contact</a>
            <button className="appointment-button">Appointment</button>
          </div>
        </nav>

        <div className="hero">
          <div className="text-section">
            <h1 className="hero-title fade-in-up delay-1">
              Graceful<br />
              Hair<br />
              <span className="accent-text">Truly, yours.</span>
            </h1>
            <p className="subtitle fade-in-up delay-2">
              Good hair gets you anywhere. We are more than a salon, we are a creative space where we give you a whole new hair experience.
            </p>
            <button className="cta-button fade-in-up delay-3">Book Now</button>
          </div>
          <div className="image-section fade-in-right delay-4">
            <img
              src={HeroImage}
              alt="Model"
              className="hero-image"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
