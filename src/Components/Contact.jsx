import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import heroImage from '../assets/image.png';
import mapImage from '../assets/demi.png';


const colorSecondary = '#f5e6d6'; // The main beige background
const colorPrimary = '#3d2626';   // Dark text/Dark Brown background for footer
const colorFormBg = '#fcf8f3';    // Slightly lighter beige for the form box
const colorButtonBg = colorPrimary; // Dark brown for the button

// --- Shared Components for Context ---

// Navbar Component
const Navbar = () => {
    // 1. State to manage the open/close status of the menu
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
                    className="text-3xl font-serif font-bold tracking-wider relative z-50" 
                    style={{ color: colorPrimary }}
                    onClick={() => setIsOpen(false)} // Close menu if logo is clicked
                >
                    demi
                    <span className="inline-block align-top ml-1 text-sm leading-none" style={{ color: colorPrimary }}>&reg;</span>
                </Link>
                
                {/* Desktop Navigation (Hidden on Mobile) */}
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
                className={`fixed inset-0 z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-300 ease-in-out md:hidden ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                style={{ backgroundColor: colorSecondary }}
            >
                {navItems.map(item => (
                    <Link 
                        key={item.name} 
                        to={item.path}
                        onClick={() => setIsOpen(false)} // Close menu when a link is clicked
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

// Footer Component
const Footer = () => (
    <footer className="w-full pt-20 pb-10" style={{ backgroundColor: colorPrimary, color: colorSecondary }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          
          <div className="flex flex-col md:flex-row justify-between relative mb-12">
            
            {/* Left Column: Script Text */}
            <div className="md:w-5/12 flex items-center mb-10 md:mb-0">
              <p 
                className="text-4xl md:text-5xl leading-tight italic" 
                style={{ fontFamily: '"Brush Script MT", cursive, serif' }}
              >
                Made with love, <br /> 
                inspired hair nature.
              </p>
            </div>

            {/* Vertical Divider (Hidden on Mobile) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white opacity-40 transform -translate-x-1/2"></div>

            {/* Right Column: Contact Details (Kept the original Tokyo details as per image_060a7c.png) */}
            <div className="md:w-5/12 flex flex-col justify-center text-sm font-sans tracking-wide space-y-4 md:pl-10">
              
              {/* Address */}
              <div className="flex items-start gap-3">
                <span className="text-red-400 text-lg">📍</span> 
                <p>
                  45 Blossom Avenue, Kyoto Street, <br/>
                  Tokyo, Japan
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-lg">📞</span> 
                <p>+81 45 6789 2231</p>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <span className="text-blue-300 text-lg">📧</span> 
                <p>hello@demibeauty.com</p>
              </div>

              {/* Socials */}
              <div className="mt-2">
                <p className="mb-1 opacity-80">Follow us:</p>
                <div className="flex items-center flex-wrap gap-x-2">
                  <span className="text-pink-400 text-lg">🌸</span> 
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
);


// --- Contact Component (Main Page) ---
const Contact = () => {
  
  // Base style for the card containers (rounded corners, soft shadow)
  const contactCardStyle = {
    borderRadius: '40px',
    boxShadow: '0 10px 30px rgba(61, 38, 38, 0.05)',
  };

  // Input Field component for clean repetition
  const FormInput = ({ id, label, type = 'text' }) => (
    <div className="space-y-1">
      <label htmlFor={id} className="sr-only">{label}</label>
      <input
        type={type}
        id={id}
        placeholder={label}
        className="w-full p-3 border border-gray-300 focus:ring-1 focus:ring-gray-600 focus:border-gray-600 transition-colors"
        style={{ borderRadius: '4px', backgroundColor: 'white' }}
        required
      />
    </div>
  );

  return (
    <div style={{ backgroundColor: colorSecondary, minHeight: '100vh' }}>
      <Navbar />

      {/* Hero Section (Replicated from image_05a4e2.png) */}
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

      {/* Contact Section */}
      <section className="py-20">
        <h2 
          className="text-4xl font-serif font-bold text-center mb-12" 
          style={{ color: colorPrimary }}
        >
          Contact Us
        </h2>

        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* LEFT: Send us a message (Form) */}
          <div 
            className="p-10 flex flex-col" 
            style={{ ...contactCardStyle, backgroundColor: colorFormBg }}
          >
            <h3 
              className="text-3xl font-serif font-bold mb-8" 
              style={{ color: colorPrimary }}
            >
              Send us a message
            </h3>
            
            <form className="space-y-5">
              <FormInput id="name" label="Full Name" />
              <FormInput id="email" label="Email Id" type="email" />
              <FormInput id="phone" label="Phone No" type="tel" />
              
              <div className="space-y-1">
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  placeholder="Message"
                  rows="6"
                  className="w-full p-3 border border-gray-300 focus:ring-1 focus:ring-gray-600 focus:border-gray-600 transition-colors resize-none"
                  style={{ borderRadius: '4px', backgroundColor: 'white' }}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 text-white font-sans uppercase tracking-widest text-lg transition-opacity hover:opacity-90"
                style={{ backgroundColor: colorButtonBg, borderRadius: '4px' }}
              >
                Send message
              </button>
            </form>
          </div>

          {/* RIGHT: Or reach out directly (Map/Info) */}
          <div 
            className="flex flex-col overflow-hidden" 
            style={{ ...contactCardStyle, backgroundColor: colorPrimary, color: colorSecondary, border: `4px solid ${colorPrimary}` }}
          >
             <h3 
              className="text-3xl font-serif font-bold p-10 pb-4" 
              style={{ color: colorSecondary }}
            >
              Or reach out directly
            </h3>
            
            <div className="p-10 pt-2 text-lg font-sans space-y-4">
                <div className="w-full h-auto overflow-hidden rounded-md border border-gray-600 shadow-md">
                    {/* UPDATED: Map image is now wrapped in a clickable link to Shalimar Bagh, Delhi */}
                    <a 
                        href="https://maps.google.com/?cid=13972034668935365191&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="View Shalimar Bagh, Delhi on Google Maps"
                    >
                        <img 
                            src={mapImage} // Static image placeholder
                            alt="Click to view Shalimar Bagh, Delhi on Google Maps"
                            className="w-full object-cover hover:opacity-90 transition-opacity"
                        />
                    </a>
                </div>
            </div>
            
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;