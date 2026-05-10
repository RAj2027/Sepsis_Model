import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const brandName = "SepsisNova";
  const letters = brandName.split("");

  const containerVariants = {
    hidden: { y: 0 },
    show: {
      y: 0,
      transition: {
        staggerChildren: 0.1,
      }
    },
    exit: {
      y: "-100%",
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: "100vh", filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
    }
  };

  useEffect(() => {
    // Total animation time based on stagger and duration
    // 10 letters * 0.1s stagger + 1.2s duration = 2.2s
    // Give a slight pause before curtain reveals
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0f0f0f]"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <div className="flex">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className="text-white text-[3vw] font-bold tracking-tight inline-block"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default Preloader;
