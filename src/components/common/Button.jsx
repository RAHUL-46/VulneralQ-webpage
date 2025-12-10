const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-200';
  
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-600 text-white hover:opacity-90',
    secondary: 'bg-[#353a4d] text-white hover:bg-[#4a5065]',
    outline: 'border-2 border-indigo-400 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-600 hover:bg-indigo-400 hover:text-white',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

