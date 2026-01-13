import React, { useState } from 'react';
import { Link } from 'react-router-dom';


import heroImage from '../assets/image.png';
import modelImage from '../assets/another.png';

// --- Color Variables ---
const colorSecondary = '#f5e6d6';
const colorPrimary = '#3d2626';
const colorCardBg = '#fffaf5';

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Shop', path: '/shop' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Login', path: '/login' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full" style={{ backgroundColor: colorSecondary }}>
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 md:px-10 relative z-50 bg-inherit">

        {/* Logo */}
        <Link
          to="/"
          className="relative z-50 flex items-center"
          onClick={() => setIsOpen(false)}
        >
          <img
            src="https://i.postimg.cc/L64d5Yks/demi-logo-png.png"
            alt="Demi Logo"
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden md:flex space-x-8">
          {navItems.map(item => (
            <Link
              key={item.name}
              to={item.path}
              className="text-lg uppercase tracking-widest hover:opacity-70 transition duration-200"
              style={{ color: colorPrimary, fontFamily: 'sans-serif' }}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Button (Visible only on Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 focus:outline-none relative z-50"
          style={{ color: colorPrimary }}
          aria-label="Toggle menu"
        >
          {/* Switch between Hamburger and Close Icon */}
          {isOpen ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown/Overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        style={{ backgroundColor: colorSecondary }}
      >
        {navItems.map(item => (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className="text-2xl uppercase tracking-widest font-medium hover:opacity-70 transition duration-200"
            style={{ color: colorPrimary, fontFamily: 'sans-serif' }}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </header>
  );
};

const About = () => {
  const cardStyle = {
    backgroundColor: colorCardBg,
    borderRadius: '40px',
    boxShadow: '0 10px 30px rgba(61, 38, 38, 0.05)',
  };

  const beigeCardTextClass = "font-sans text-base leading-relaxed tracking-wide mt-4";
  const titleClass = "text-4xl font-serif font-normal";

  return (
    <div style={{ backgroundColor: colorSecondary, minHeight: '100vh' }}>
      <Navbar />

      {/* Hero Section */}
      <section
        className="w-full h-96 flex items-end relative"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-10 pb-8 relative z-10">
          <h1
            className="text-5xl md:text-6xl font-serif font-bold tracking-tight"
            style={{ color: colorSecondary, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
          >
            Our story . Your Passion . Your Hair
          </h1>
        </div>
      </section>

      <section className="py-12">
        <h2
          className="text-4xl font-serif font-light text-center tracking-wider"
          style={{ color: colorPrimary }}
        >
          About Us
        </h2>
      </section>

      {/*MAIN GRID SECTION*/}

      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

        <div className="p-10 flex flex-col" style={cardStyle}>
          <h3 className={titleClass} style={{ color: colorPrimary }}>Our Story</h3>
          <div className="w-10 h-0.5 bg-gray-300 mt-6 mb-2"></div> {/* Optional decorative line */}
          <p className={beigeCardTextClass} style={{ color: colorPrimary }}>
            The journey of Demi began with a simple, yet profound belief: that the strength and magnificence of natural beauty are found in nature. Our Story is rooted in time-honored traditions, seamlessly blended with modern science to unlock the full potential of elements like the strengthening power of Aloe Vera.
          </p>
        </div>

        <div
          className="p-10 flex flex-col md:row-span-2"
          style={cardStyle}
        >
          {/* Image Container */}
          <div className="mb-8 overflow-hidden rounded-2xl w-full">
            <img
              src={modelImage}
              alt="Model with straight, shiny hair"
              className="w-full h-auto object-cover transform hover:scale-105 transition duration-500"
            />
          </div>

          <h3 className={`${titleClass} text-center md:text-left`} style={{ color: colorPrimary }}>Your Hair</h3>

          <p className={beigeCardTextClass} style={{ color: colorPrimary }}>
            At Demi, we believe your hair is a powerful form of self-expression, a statement of confidence and beauty that is uniquely yours. Your Hair deserves a regimen that respects its natural texture and provides deep, lasting nourishment.
            <br /><br />
            Our formulas are designed not just to mask imperfections, but to build internal strength, enhance shine, and deliver that undeniable, silky-smooth finish. With every use, Demi empowers you to fall in love with your reflection, transforming daily care into a luxurious ritual that celebrates the vitality and radiance of Your Hair.
          </p>
        </div>

        <div className="p-10" style={cardStyle}>
          <h3 className={titleClass} style={{ color: colorPrimary }}>Your Passion</h3>
          <div className="w-10 h-0.5 bg-gray-300 mt-6 mb-2"></div>
          <p className={beigeCardTextClass} style={{ color: colorPrimary }}>
            We are driven by Your Passion—the desire for hair that looks as vibrant as you feel on the inside. We understand the personal connection you have with your routine, and that's why we create products that don't just treat hair, but nourish the soul. At Demi, we don't just sell haircare; we celebrate Your Hair in every form.
          </p>
        </div>

      </section>

      <footer className="w-full pt-20 pb-10" style={{ backgroundColor: colorPrimary, color: colorSecondary }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          <div className="flex flex-col md:flex-row justify-between relative mb-12">

            {/* Left Column*/}
            <div className="md:w-5/12 flex items-center mb-10 md:mb-0">
              <p
                className="text-4xl md:text-5xl leading-tight italic"
                style={{ fontFamily: '"Brush Script MT", cursive, serif' }}
              >
                Made with love, <br />
                inspired hair nature.
              </p>
            </div>

            {/* Vertical Divider*/}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white opacity-40 transform -translate-x-1/2"></div>

            {/* Right Column*/}
            <div className="md:w-5/12 flex flex-col justify-center text-sm font-sans tracking-wide space-y-4 md:pl-10">

              {/* Address */}
              <div className="flex items-start gap-3">
                <span className="text-red-400 text-lg">📍</span> {/* Pin Emoji */}
                <p>
                  45 Blossom Avenue, Kyoto Street, <br />
                  Tokyo, Japan
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-lg">📞</span> {/* Phone Emoji */}
                <p>+81 45 6789 2231</p>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <span className="text-blue-300 text-lg">📧</span> {/* Email Emoji */}
                <p>hello@demibeauty.com</p>
              </div>

              {/* Socials */}
              <div className="mt-2">
                <p className="mb-1 opacity-80">Follow us:</p>
                <div className="flex items-center flex-wrap gap-x-2">
                  <span className="text-pink-400 text-lg">🌸</span> {/* Flower Emoji */}
                  <a href="#" className="hover:text-white transition-colors underline decoration-1 underline-offset-2">Instagram</a>
                  <span>|</span>
                  <a href="#" className="hover:text-white transition-colors underline decoration-1 underline-offset-2">Pinterest</a>
                  <span>|</span>
                  <a href="#" className="hover:text-white transition-colors underline decoration-1 underline-offset-2">Facebook</a>
                  <span>|</span>
                  <a href="#" className="hover:text-white transition-colors underline decoration-1 underline-offset-2">YouTube</a>
                </div>
              </div>

            </div>
          </div>

          {/* Horizontal Bottom Line */}
          <div className="w-full h-px bg-white opacity-40"></div>

        </div>
      </footer>

    </div>
  );
};

export default About;