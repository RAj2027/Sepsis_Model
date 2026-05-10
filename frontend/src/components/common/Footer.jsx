import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
    // Reveal variations for the footer elements when scrolled into view
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.0, ease: [0.215, 0.61, 0.355, 1] }
        }
    };

    const linkHoverVariants = {
        rest: { opacity: 0.6, x: 0 },
        hover: { 
            opacity: 1, 
            x: 5,
            color: "#1a1a1a",
            transition: { duration: 0.3, ease: "easeOut" }
        }
    };

    return (
        <footer className="relative w-full overflow-hidden flex flex-col items-center justify-center pt-32 pb-8 px-6 sm:px-12 border-t border-gray-100 mt-20">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-gradient-to-b from-[#f8cde2]/30 via-[#89c4f4]/20 to-transparent blur-[120px] pointer-events-none -z-10 rounded-full"></div>
            
            {/* Grainy Noise pattern */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none -z-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}></div>

            <motion.div 
                className="w-full max-w-[1440px] flex flex-col items-center relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Huge Brand Typography */}
                <motion.h1 
                    variants={itemVariants}
                    className="text-[14vw] md:text-[10rem] lg:text-[12rem] xl:text-[14rem] leading-[0.8] font-bold tracking-tighter bg-gradient-to-b from-gray-900 via-gray-800 to-gray-500 bg-clip-text text-transparent text-center mb-6 drop-shadow-sm"
                >
                    SepsisNova
                </motion.h1>

                <motion.p variants={itemVariants} className="text-gray-500 font-medium text-lg md:text-xl tracking-tight max-w-md text-center mb-24 leading-relaxed">
                    Pioneering predictive clinical intelligence to empower global care teams.
                </motion.p>

                {/* Footer Links & Info Grid */}
                <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mt-10 p-8 sm:p-10 rounded-3xl bg-white/40 backdrop-blur-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.03)] border border-white/60">
                    
                    {/* Left side info */}
                    <motion.div variants={itemVariants} className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_12px_3px_rgba(74,222,128,0.3)]"></span>
                            <span className="text-sm font-semibold tracking-tight text-gray-800">System Operational</span>
                        </div>
                        <p className="text-sm text-gray-500 font-medium max-w-xs leading-relaxed">
                            Designed for modern medical intensive care units. Ensuring patient safety at a planetary scale.
                        </p>
                    </motion.div>

                    {/* Right side links */}
                    <div className="flex flex-wrap gap-16 md:gap-24">
                        <motion.div variants={itemVariants} className="flex flex-col gap-4">
                            <h4 className="text-gray-900 font-bold tracking-tight mb-2">Platform</h4>
                            {['Diagnostic AI', 'ICU Integrations', 'Research Papers', 'Security'].map(link => (
                                <motion.span key={link} variants={linkHoverVariants} initial="rest" whileHover="hover" className="text-sm cursor-pointer font-medium">
                                    {link}
                                </motion.span>
                            ))}
                        </motion.div>
                        <motion.div variants={itemVariants} className="flex flex-col gap-4">
                            <h4 className="text-gray-900 font-bold tracking-tight mb-2">Company</h4>
                            {['About SepsisNova', 'Careers', 'Contact Sales', 'Terms of Care'].map(link => (
                                <motion.span key={link} variants={linkHoverVariants} initial="rest" whileHover="hover" className="text-sm cursor-pointer font-medium">
                                    {link}
                                </motion.span>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <motion.div variants={itemVariants} className="w-full flex flex-col sm:flex-row justify-between items-center mt-8 px-4 text-[13px] font-semibold text-gray-400">
                    <p>&copy; {new Date().getFullYear()} SepsisNova Inc. All rights reserved.</p>
                    <div className="flex gap-8 mt-4 sm:mt-0">
                        <span className="hover:text-gray-800 transition-colors cursor-pointer">Privacy Policy</span>
                        <span className="hover:text-gray-800 transition-colors cursor-pointer">Cookie Settings</span>
                    </div>
                </motion.div>
            </motion.div>
        </footer>
    );
};

export default Footer;
