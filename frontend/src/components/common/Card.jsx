import React from 'react';

const Card = ({ children, className = '', gradient = false }) => {
    const baseStyle = 'overflow-hidden rounded-[2rem] p-8 transition-all duration-300';
    const visualStyle = gradient 
        ? 'text-white border-0 shadow-lg' 
        : 'bg-white/80 backdrop-blur-md border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]';
    
    return (
        <div className={`${baseStyle} ${visualStyle} ${className}`}>
            {children}
        </div>
    );
};

export default Card;
