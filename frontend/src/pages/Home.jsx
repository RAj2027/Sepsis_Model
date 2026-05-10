import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { ArrowUpRight, Play } from 'lucide-react';

const Home = () => {
    // Parent container staggers its children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 3.0, // starts just as the preloader curtain begins sliding up
                staggerChildren: 0.15,
            }
        }
    };

    // Each child item will fade in and slide up smoothly
    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.0, ease: [0.215, 0.61, 0.355, 1] }
        }
    };

    // Slightly different variant for larger elements like cards to give more weight
    const cardVariants = {
        hidden: { opacity: 0, y: 60, scale: 1 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }
        },
        hover: {
            y: -8,
            scale: 1.015,
            boxShadow: "0 30px 60px -15px rgba(0,0,0,0.25)",
            filter: "brightness(1.05)",
            transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }
        }
    };

    const iconHoverVariants = {
        hidden: { x: 0, y: 0, rotate: 0 },
        visible: { x: 0, y: 0, rotate: 0 },
        hover: {
            x: 4,
            y: -4,
            rotate: 15,
            transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }
        }
    };

    return (
        <motion.div 
            className="w-full flex-col xl:flex-row flex items-stretch gap-6 lg:gap-12 pb-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            
            {/* Left Column: Text Content */}
            <div className="flex-1 flex flex-col justify-between py-6 max-w-3xl">
                <div>
                    <h1 className="text-[3.5rem] sm:text-[5rem] lg:text-[5.5rem] leading-[0.95] font-semibold tracking-[-0.04em] text-[#1a1a1a]">
                        <motion.span variants={itemVariants} className="inline-flex items-center">
                            {/* Decorative pink pill */}
                            <span className="inline-block w-20 h-10 sm:w-28 sm:h-12 lg:w-32 lg:h-[3.5rem] bg-gradient-to-b from-[#f8cde2] to-[#df99c1] rounded-full mr-4 align-middle hidden sm:inline-block shadow-inner relative overflow-hidden">
                                <span className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,white_2px,white_4px)]"></span>
                            </span>
                            World-class
                        </motion.span>
                        <br />
                        <motion.span variants={itemVariants} className="block">diagnostic AI that</motion.span>
                        <motion.span variants={itemVariants} className="block">
                            empowers 
                            <span className="inline-flex items-center align-middle mx-4 mt-2">
                                <span className="flex items-center border border-gray-300 rounded-full px-5 py-2.5 text-sm md:text-base font-medium text-gray-800 hover:bg-gray-50 transition cursor-pointer shadow-sm">
                                    <Play size={16} className="mr-2 opacity-80" /> View demo
                                </span>
                            </span>
                        </motion.span>
                        <motion.span variants={itemVariants} className="block">clinical teams</motion.span>
                    </h1>

                    <motion.div variants={itemVariants} className="mt-12 flex items-center gap-6">
                        <Link to="/predict">
                            <Button variant="primary" className="!bg-[#9bc2f6] hover:!bg-[#8baee3] text-white !text-lg !px-8 h-12 shadow-md">
                                Detect Sepsis <ArrowUpRight size={18} className="ml-2 font-bold" />
                            </Button>
                        </Link>
                        <Link to="/dashboard">
                            <Button variant="text" className="!text-lg !font-semibold text-gray-800 decoration-gray-400">View Analytics</Button>
                        </Link>
                    </motion.div>
                </div>

                <motion.div variants={itemVariants} className="mt-24 lg:mt-auto pt-10">
                    <p className="text-[#333] font-medium max-w-sm text-sm sm:text-base mb-8 leading-relaxed">
                        SepsisNova continuously monitors ICU vitals to provide early warnings, fostering the deployment of rapid, life-saving clinical workflows.
                    </p>
                    
                    {/* Trusted By / Logos */}
                    <div className="flex flex-wrap items-center gap-8 text-[#1a1a1a] font-bold text-xl opacity-80 mix-blend-multiply">
                        <div className="flex items-center"><span className="w-4 h-4 bg-[#1a1a1a] rounded-sm mr-2 rotate-45 opacity-80"></span>Apex Health</div>
                        <div className="font-serif italic font-medium tracking-wide text-[1.35rem]">Mercy<span className="text-gray-500 ml-1 opacity-70">&#x271A;</span></div>
                        <div className="flex items-center lowercase font-semibold tracking-tight"><span className="text-2xl mr-1 font-normal text-[#1a1a1a] opacity-80">&#x2665;</span> trinity</div>
                        <div className="uppercase font-extrabold text-[1.4rem] tracking-tighter flex items-center">
                            <span className="text-[1.8rem] leading-none mr-1 font-normal">&#x2295;</span> UCSF
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Right Column: Grid Cards */}
            <div className="flex-1 grid grid-cols-2 gap-4 lg:gap-5 xl:max-w-2xl mt-12 xl:mt-0 relative">
                
                {/* Background ambient glow behind cards */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-[#d9b6fc]/30 via-[#89c4f4]/20 to-[#fce3ed]/30 blur-[100px] pointer-events-none rounded-full z-[-1] mix-blend-multiply flex-shrink-0"></div>

                {/* Top Span Card */}
                <motion.div variants={cardVariants} whileHover="hover" className="col-span-2 relative drop-shadow-sm origin-bottom">
                    <Card gradient className="h-full relative bg-gradient-to-br from-[#8d9adc] to-[#7b87db] overflow-hidden flex flex-col justify-between p-8 sm:p-12 min-h-[340px]">
                        {/* Grainy overlay */}
                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}></div>
                        {/* Decorative abstract bubble */}
                        <div className="absolute right-[-10%] top-[-20%] w-64 h-64 bg-white/20 blur-[50px] rounded-full pointer-events-none"></div>
                        <div className="absolute right-[-5%] top-[10%] w-[55%] h-[90%] bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center mix-blend-color-dodge rounded-full filter blur-[2px] opacity-60"></div>

                        <h2 className="text-[2.5rem] sm:text-[3rem] font-medium tracking-tight leading-[1.1] max-w-lg relative z-10 text-white drop-shadow-sm font-sans mb-8">
                            Detect sepsis hours before onset with advanced AI.
                        </h2>
                        
                        <div className="flex justify-between items-end relative z-10 w-full mt-auto">
                            <p className="text-white/90 text-[15px] max-w-[220px] leading-relaxed font-medium">
                                Our machine learning models analyze vital signs continuously to provide early warnings and save lives.
                            </p>
                            <Link to="/predict">
                                <span className="w-14 h-14 bg-white text-gray-900 rounded-full flex items-center justify-center cursor-pointer shadow-[0_10px_20px_rgba(0,0,0,0.1)] text-xl font-bold">
                                    <motion.div variants={iconHoverVariants}>
                                        <ArrowUpRight size={26} strokeWidth={2.5}/>
                                    </motion.div>
                                </span>
                            </Link>
                        </div>
                    </Card>
                </motion.div>

                {/* Bottom Left Card */}
                <motion.div variants={cardVariants} whileHover="hover" className="col-span-1 relative drop-shadow-sm origin-bottom">
                    <Card gradient className="h-full relative bg-[#7faeff] flex flex-col justify-between overflow-hidden min-h-[300px] p-8">
                        {/* Grainy overlay */}
                        <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}></div>
                        
                        {/* Sphere Graphic */}
                        <div className="absolute inset-x-0 bottom-[-10%] m-auto w-[120%] aspect-square bg-[radial-gradient(circle_at_30%_30%,_#ffffff99_0%,_#3b82f600_60%)] rounded-full pointer-events-none shadow-[inset_0_-20px_50px_rgba(255,255,255,0.4)]"></div>
                        
                        <div className="flex justify-between relative z-10 w-full">
                            <span className="bg-white text-gray-900 text-sm font-semibold px-4 py-1.5 rounded-full flex items-center shadow-sm">
                                hospitals
                            </span>
                            <span className="w-10 h-10 bg-white text-gray-900 rounded-full flex items-center justify-center cursor-pointer shadow-[0_5px_15px_rgba(0,0,0,0.08)] font-bold">
                                <motion.div variants={iconHoverVariants}>
                                    <ArrowUpRight size={18} strokeWidth={2.5}/>
                                </motion.div>
                            </span>
                        </div>

                        <div className="relative z-10 mt-auto pt-16">
                            <h3 className="text-3xl font-medium leading-[1.1] mb-4 text-white">Global ICU<br/>integrations</h3>
                            <p className="text-white/90 text-sm leading-relaxed max-w-[200px] font-medium">
                                SepsisNova integrates seamlessly with leading EMR systems to protect patients worldwide.
                            </p>
                        </div>
                    </Card>
                </motion.div>

                {/* Bottom Right Card */}
                <motion.div variants={cardVariants} whileHover="hover" className="col-span-1 relative drop-shadow-sm origin-bottom">
                    <Card gradient className="h-full relative bg-gradient-to-b from-[#fad5e6] to-[#ebafcf] flex flex-col justify-between overflow-hidden min-h-[300px] p-8">
                        {/* Grainy overlay */}
                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}></div>
                        
                        {/* Vertical Ribbed Texture */}
                        <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,#ffffff66_10px,#ffffff66_20px)] mix-blend-overlay"></div>
                        
                        <div className="relative z-10 flex justify-between items-start w-full">
                            <span className="bg-white text-gray-900 text-sm font-semibold px-4 py-1.5 rounded-full inline-flex items-center shadow-sm">
                                accuracy
                            </span>
                            <div className="flex -space-x-2.5">
                                <img className="w-9 h-9 rounded-full border-[2px] border-white shadow-sm filter grayscale contrast-125" src="https://i.pravatar.cc/100?img=1" alt="Avatar" />
                                <img className="w-9 h-9 rounded-full border-[2px] border-white shadow-sm filter grayscale contrast-125" src="https://i.pravatar.cc/100?img=2" alt="Avatar" />
                                <img className="w-9 h-9 rounded-full border-[2px] border-white shadow-sm filter grayscale contrast-125" src="https://i.pravatar.cc/100?img=3" alt="Avatar" />
                            </div>
                        </div>

                        <div className="relative z-10 mt-auto pt-12 text-white">
                            <div className="text-[5.5rem] leading-none font-normal tracking-tight mb-3">99%</div>
                            <p className="text-white/90 text-sm leading-relaxed font-medium">
                                Achieving state-of-the-art PR-AUC benchmarks to deliver early predictive interventions.
                            </p>
                        </div>
                    </Card>
                </motion.div>

            </div>
        </motion.div>
    );
};

export default Home;
