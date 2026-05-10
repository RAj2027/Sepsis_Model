import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';

const MainLayout = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-200 selection:text-blue-900 flex flex-col relative">
            {/* Background Dot Grid */}
            <div className="fixed inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

            {/* Navbar Wrapper */}
            <motion.div 
                className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 transition-all duration-300"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 3.1, ease: [0.215, 0.61, 0.355, 1] }}
            >
                <nav className={`
                    flex items-center justify-between px-6 py-3 transition-all duration-500 ease-in-out
                    ${scrolled 
                        ? 'w-[90%] max-w-[1100px] bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] rounded-full' 
                        : 'w-full max-w-[1300px] bg-transparent border-transparent rounded-none'
                    }
                `}>
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="font-bold text-[1.2rem] tracking-tight text-gray-900 uppercase">
                            SepsisNova
                        </Link>
                    </div>
                    
                    {/* Center Links */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <NavLink to="/" className={({isActive}) => `text-[14px] font-medium transition-all duration-300 ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'}`}>Features</NavLink>
                        <NavLink to="/predict" className={({isActive}) => `text-[14px] font-medium transition-all duration-300 ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'}`}>Predict Tool</NavLink>
                        <NavLink to="/dashboard" className={({isActive}) => `text-[14px] font-medium transition-all duration-300 ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'}`}>Analytics</NavLink>
                        <span className="text-[14px] font-medium text-gray-500 hover:text-black transition-colors cursor-pointer">Research</span>
                    </div>
                    
                    {/* Right Actions */}
                    <div className="flex items-center space-x-5">
                        <button className="text-[14px] font-semibold text-gray-700 hover:text-black hidden sm:block">Clinician Login</button>
                        <Link to="/predict">
                            <button className="px-6 py-2.5 rounded-full bg-[#111] text-white text-[14px] font-semibold hover:bg-black transition-all shadow-md active:scale-95">
                                Try SepsisNova
                            </button>
                        </Link>
                    </div>
                </nav>
            </motion.div>

            <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-32 pb-12 flex flex-col relative z-10">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
