import React, { useState } from "react";
import { Link } from "react-router";

export const colorPrimary = '#3d2626';
export const colorSecondary = '#f5e6d6';

//Hero Image - Home Page
const heroImageUrl = "https://i.postimg.cc/TPGxG7P9/f9649b02-12ab-423c-9c2d-1bbb06ebabeb.png";

const productImageUrl1 = "https://m.media-amazon.com/images/I/51UjKEQEf3L._AC_UF1000,1000_QL80_.jpg";
const productImageUrl2 = "https://media.istockphoto.com/id/153737841/photo/rice.jpg?s=612x612&w=0&k=20&c=lfO7iLT0UsDDzra0uBOsN1rvr2d5OEtrG2uwbts33_c=";

//Feature Icon
const FeatureIcon = ({ icon, label }) => (
    <div className="flex flex-col items-center space-y-2 w-1/2 md:w-auto">
        <div
            className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border-2 rounded-full p-4"
            style={{ borderColor: colorPrimary }}
        >
            {icon}
        </div>
        <span
            className="text-xs tracking-widest uppercase"
            style={{ fontFamily: 'Georgia, serif', color: colorPrimary }}
        >
            {label}
        </span>
    </div>
);
const SakuraIcon = (
    <img
        src="https://i.postimg.cc/rw51VWxf/cherry-blossom.png"
        alt="Sakura Blossom Icon"
        className="w-20 h-12"
        onError={(e) => { e.target.onerror = null; e.target.style.backgroundColor = colorPrimary; e.target.style.borderRadius = '50%'; e.target.className = 'w-4 h-4' }}
    />
);

const RiceIcon = (
    <img
        src="https://i.postimg.cc/yN4z9qJd/wheat.png"
        alt="Sakura Blossom Icon"
        className="w-20 h-12"
        onError={(e) => { e.target.onerror = null; e.target.style.backgroundColor = colorPrimary; e.target.style.borderRadius = '50%'; e.target.className = 'w-4 h-4' }}
    />
);


// Main Sections - Start from Navbar

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

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 focus:outline-none relative z-50"
                    style={{ color: colorPrimary }}
                    aria-label="Toggle menu"
                >
                    {/* Switch between Hamburger*/}
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

            {/* Mobile Menu Dropdown */}
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

const HeroSection = () => (
    <div className="flex flex-col md:flex-row min-h-[70vh]">
        {/* Left Column*/}
        <div
            className="md:w-1/2 p-10 md:p-16 lg:p-24 flex flex-col justify-center"
            style={{ backgroundColor: colorPrimary, color: colorSecondary }}
        >
            <h1
                className="text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight"
                style={{ fontFamily: 'Georgia, serif', fontWeight: 600 }}
            >
                NATURE EMBRACE <br /> FOR RADIANT HAIR
            </h1>
            <p className="text-sm max-w-md mb-8 leading-relaxed opacity-90">
                Restore your hair's natural radiance with the Demi Hair Mask. It features a concentrated blend of Sakura Extract, rich in antioxidants, and hydrolyzed Rice Protein to deeply nourish and strengthen every strand. This precious formula reduces breakage, creating a look of glorious depth of color and natural shine.
            </p>
            <button
                className="w-40 py-3 text-xs uppercase tracking-widest transition duration-300 hover:opacity-90 rounded-md"
                style={{ backgroundColor: colorSecondary, color: colorPrimary }}
            >
                <Link to={"/shop"}>Shop Now</Link>
            </button>
        </div>

        {/* Right Column*/}
        <div className="md:w-1/2 h-96 md:h-auto overflow-hidden">
            <img
                src={heroImageUrl}
                alt="Woman with radiant hair holding a product jar"
                className="w-full h-full "
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x1200/402929/ffffff?text=Placeholder+Image' }}
            />
        </div>
    </div>
);

const RestoreNourishingSection = () => (
    <div
        className="py-16 md:py-24 px-6 md:px-10 lg:px-24"
        style={{ backgroundColor: colorSecondary }}
    >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
            {/* Left Content*/}
            <div className="lg:w-3/5 lg:pr-12">
                <h2
                    className="text-3xl md:text-4xl lg:text-5xl mb-6"
                    style={{ fontFamily: 'Georgia, serif', color: colorPrimary, fontWeight: 500 }}
                >
                    RESTORE NOURISHING
                </h2>

                <p className="text-base max-w-3xl mb-12 leading-relaxed" style={{ color: colorPrimary }}>
                    The Demi Hair Mask is enriched with the natural goodness of Sakura Extract and Rice Protein, Sakura Extract helps to soothe the scalp and restore natural shine, leaving the hair soft, silky, and delicately fragrant. Meanwhile, Rice Protein strengthens each strand from root to tip, improving elasticity and reducing breakage.
                </p>

                {/* Feature Icons */}
                <div className="flex justify-start space-x-8 md:space-x-16 mb-16 md:mb-24">
                    <FeatureIcon icon={SakuraIcon} label="SAKURA EXTRACT" />
                    <FeatureIcon icon={RiceIcon} label="RICE PROTEIN" />
                </div>

                {/* Bottom Title */}
                <h2
                    className="text-3xl md:text-4xl lg:text-5xl mt-12 mb-0 text-left"
                    style={{ fontFamily: 'Georgia, serif', color: colorPrimary, fontWeight: 500 }}
                >
                    RESTORE NURTURE BLOSSOM
                </h2>
            </div>

            {/* Main Content*/}
            <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mt-8">

                <div className="w-full lg:w-3/5 order-2 lg:order-1">
                    <p
                        className="text-base md:text-lg leading-relaxed text-left"
                        style={{
                            fontFamily: 'Georgia, serif',
                            color: colorPrimary,
                            opacity: 0.9,
                            lineHeight: '1.7'
                        }}
                    >
                        DEMI is a nourishing hair care product enriched with rice protein, specially formulated to
                        strengthen and protect hair from root to tip. Rice protein is known for its ability to
                        repair damaged strands, improve elasticity, and reduce breakage, making hair smoother,
                        shinier, and more manageable.
                        <br /><br />
                        The lightweight formula penetrates deep into the hair shaft to restore moisture and
                        enhance texture without weighing the hair down. Suitable for all hair types, DEMI
                        helps revive dull and weak hair, leaving it healthy, soft, and naturally radiant with regular use.
                    </p>
                </div>

                {/* Right Side*/}
                <div className=" lg:w-2/5 flex flex-row gap-6 space-y-10 items-end order-1 lg:order-2">
                    <img
                        src={productImageUrl1}
                        alt="Close up of hair treatment"
                        className="w-full max-w-[150px] object-cover shadow-lg"
                        style={{
                            height: '150px',
                            transform: 'translateY(-10px)'
                        }}
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/8a5c2e/ffffff?text=Image+1' }}
                    />
                    <img
                        src={productImageUrl2}
                        alt="Close up of textured oil"
                        className="w-full max-w-[150px] object-cover shadow-lg"
                        style={{
                            height: '150px',
                            transform: 'translateY(-10px)'
                        }}
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/d4af37/ffffff?text=Image+2' }}
                    />
                </div>
            </div>
        </div>
    </div>
);

const Footer = () => (
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

                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white opacity-40 transform -translate-x-1/2"></div>

                <div className="md:w-5/12 flex flex-col justify-center text-sm font-sans tracking-wide space-y-4 md:pl-10">

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
);

const Home = () => {
    return (
        <div className="antialiased" style={{ backgroundColor: colorSecondary }}>
            <Navbar />
            <HeroSection />
            <RestoreNourishingSection />
            <Footer />
        </div>
    );
}
export default Home