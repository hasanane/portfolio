import React, { useState, useEffect } from 'react';

const ScrollChangeStyle: React.FC = () => {
  const [isStyled, setIsStyled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // تغییر استایل بر اساس موقعیت اسکرول
      if (currentScrollY > 200) {
        setIsStyled(true);
      } else {
        setIsStyled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
        <a
          className=" w-1/4 h-full flex justify-center items-center"
        >
          <button className="rounded-lg w-full h-full flex justify-center text-3xl items-center hover:border-dotted hover:border-4 border-Cyan-800 rounded hover:gradient-hover transition duration-500 ease-in-out">
            Contact
          </button>
        </a>
    <div
      className={`flex items-center justify-center transition-all duration-500 ease-in-out ${
        isStyled ? 'bg-red-400 scale-105' : 'bg-blue-400'
      }`}
    >
      <h2 className="text-white text-2xl">Scroll to Change My Style!</h2>
    </div>
    </div>
  );
};

export default ScrollChangeStyle;
