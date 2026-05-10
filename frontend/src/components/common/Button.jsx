import React from 'react';

const Button = ({ children, type = 'button', onClick, className = '', disabled, variant = 'primary', icon }) => {
    const baseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 focus:outline-none';
    const variants = {
        primary: 'bg-[#9bbef3] text-white hover:bg-[#8aecff] shadow-sm',
        secondary: 'bg-white text-gray-800 hover:bg-gray-50 border border-gray-200 shadow-sm',
        text: 'bg-transparent text-gray-800 hover:text-blue-500 underline underline-offset-4 decoration-1',
        iconOnly: 'bg-white text-gray-800 w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-50 shadow-sm'
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        >
            {children}
            {icon && <span className="ml-2">{icon}</span>}
        </button>
    );
};

export default Button;
