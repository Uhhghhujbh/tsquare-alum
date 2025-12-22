import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaWhatsapp, FaPhoneAlt, FaBars, FaTimes } from 'react-icons/fa';

const Layout = ({ children }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Hooks for navigation and scrolling
    const { pathname, hash } = useLocation();
    const navigate = useNavigate();

    // WhatsApp details
    const waNumber = "2348106151579";
    const waMessage = encodeURIComponent("Hello T Square Aluminium, I want to make an enquiry from your website. I will be needing materials from you ");
    const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

    // 1. SCROLL LISTENER: Handles the smooth scroll when URL has a #hash
    useEffect(() => {
        // If there is a hash (e.g. #contact), scroll to it
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // If just changing pages (e.g. to Services), scroll to top
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]); // Run this everytime path or hash changes

    // 2. NAVBAR SCROLL EFFECT
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 3. SMART NAVIGATION FUNCTION
    const handleNavClick = (path) => {
        setIsMobileMenuOpen(false); // Close mobile menu

        // If it's a section link (has #) and we are NOT on home page
        if (path.includes('#') && pathname !== '/') {
            // Navigate to home first, the useEffect above will handle the scroll
            navigate(path); 
        }
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'About', path: '/#about' },   // <--- Now points to #about
        { name: 'Portfolio', path: '/#gallery' }, // <--- Now points to #gallery
        { name: 'Contact', path: '/#contact' },
    ];

    return (
        <div className="relative min-h-screen flex flex-col">
            {/* Navigation Bar */}
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
                <div className="container mx-auto px-4 flex justify-between items-center">
                   {/* Logo Area */}
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/tsquare.jpg" alt="T Square Logo" className="h-12 w-auto object-contain" />
                        <div>
                            <h1 className={`font-bold text-xl leading-tight ${isScrolled ? 'text-brand-brand' : 'text-white'}`}>T Square</h1>
                            <span className={`text-xs block ${isScrolled ? 'text-brand-secondary' : 'text-gray-200'}`}>Aluminium Enterprises</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <ul className="flex gap-6">
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    {/* Using HashLink logic manually */}
                                    <Link 
                                        to={link.path} 
                                        onClick={() => handleNavClick(link.path)}
                                        className={`font-medium hover:text-blue-500 transition ${isScrolled ? 'text-gray-800' : 'text-white'}`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <a href={`tel:+2347065046511`} className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 font-semibold hover:bg-blue-700 transition shadow-sm">
                            <FaPhoneAlt className="text-sm"/> Call Now
                        </a>
                    </div>

                     {/* Mobile Menu Toggle */}
                     <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-2xl z-50">
                        {isMobileMenuOpen ? <FaTimes className="text-gray-800"/> : <FaBars className={isScrolled ? 'text-gray-800' : 'text-white'} />}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                     <div className="md:hidden absolute top-0 left-0 w-full bg-white shadow-xl pt-20 pb-10 px-6 flex flex-col gap-6">
                        {navLinks.map((link, index) => (
                            <Link 
                                key={index} 
                                to={link.path} 
                                onClick={() => handleNavClick(link.path)} 
                                className="block text-xl text-gray-800 font-bold border-b border-gray-100 pb-2"
                            >
                                {link.name}
                            </Link>
                        ))}
                     </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-8 text-center border-t border-gray-800">
                <p>© {new Date().getFullYear()} T Square Aluminium Enterprises.</p>
                <p className="text-sm mt-1 text-gray-500">22, Adebiyi Ayopo Street, Dopemu, Lagos State.</p>
                
            </footer>

            {/* FLOATING WHATSAPP BUTTON */}
            <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 animate-bounce"
                title="Chat on WhatsApp"
            >
                <FaWhatsapp className="text-3xl" />
            </a>
        </div>
    );
};

export default Layout;