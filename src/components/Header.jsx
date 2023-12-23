import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars } from "react-icons/fa";

const Header = () => {
    const location = useLocation();
    const [isHeaderVisible, setHeaderVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

    const [barIsOpen, setBarIsOpen] = useState(false);
    const barRef = useRef(null);

    const handleToggleBar = () =>{
        setBarIsOpen(!barIsOpen);
    }

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        const isScrollingUp = prevScrollPos > currentScrollPos;

        setHeaderVisible(isScrollingUp || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
    };

    const closeBar = (event) => {
        if (barRef.current && !barRef.current.contains(event.target)) {
          setBarIsOpen(false);
        }
      };
    
    useEffect(() => {
        document.addEventListener('click', closeBar);
        return () => {
            document.removeEventListener('click', closeBar);
        };
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    const headerClasses = `z-10 fixed top-0 w-full h-[10vh] bg-primary1 2xl:px-20 xl:px-20 lg:px-20 md:px-20 sm:px-6 px-6 transition-transform duration-500 bg-primary1 text-white ${
        isHeaderVisible ? 'translate-y-0 opacity-80' : 'opacity-0 -translate-y-full'
      } `;

    

  return (
    <>
    <header className={headerClasses}>
        <div className='flex justify-between items-center h-full'>
            <Link to='/'>
                <img src={`/img/logo.png`} className='h-[40px]' alt="logo-suitmedia" />
            </Link>
            <div className='2xl:flex xl:flex lg:flex md:flex sm:hidden hidden justify-center gap-10  text-[16px] font-bold'>
                <Link to="/work" className={`hover:border-opacity-100 border-white border-opacity-0 border-b-4 py-2 duration-300 ${location.pathname === '/work' ? 'border-opacity-100' : 'border-opacity-0'}`}>Work</Link>
                <Link to="/about" className={`hover:border-opacity-100 border-white border-opacity-0 border-b-4 py-2 duration-300 ${location.pathname === '/about' ? 'border-opacity-100' : 'border-opacity-0'}`}>About</Link>
                <Link to="/services" className={`hover:border-opacity-100 border-white border-opacity-0 border-b-4 py-2 duration-300 ${location.pathname === '/services' ? 'border-opacity-100' : 'border-opacity-0'}`}>Services</Link>
                <Link to="/ideas" className={`hover:border-opacity-100 border-white border-opacity-0 border-b-4 py-2 duration-300 ${location.pathname === '/ideas' ? 'border-opacity-100' : 'border-opacity-0'}`}>Ideas</Link>
                <Link to="/careers" className={`hover:border-opacity-100 border-white border-opacity-0 border-b-4 py-2 duration-300 ${location.pathname === '/careers' ? 'border-opacity-100' : 'border-opacity-0'}`}>Careers</Link>
                <Link to="/contact" className={`hover:border-opacity-100 border-white border-opacity-0 border-b-4 py-2 duration-300 ${location.pathname === '/contact' ? 'border-opacity-100' : 'border-opacity-0'}`}>Contact</Link>
            </div>
            <div className='2xl:hidden xl:hidden lg:hidden md:hidden sm:block block'>
                <FaBars onClick={handleToggleBar} />
                {barIsOpen ? (
                <div className='bg-primary1 absolute h-screen right-0 top-0 w-screen flex flex-col justify-start'  >
                    <div className='p-6 flex justify-end'>
                        <FaBars onClick={handleToggleBar}/>
                    </div>
                    <div className='flex-col p-6 flex justify-center items-end gap-10  text-[16px] font-bold'>
                        <Link to="/work" className={`hover:border-opacity-100 w-fit border-white border-opacity-0 border-b-4 py-2 duration-300 ${location.pathname === '/work' ? 'border-opacity-100' : 'border-opacity-0'}`}>Work</Link>
                        <Link to="/about" className={`hover:border-opacity-100 w-fit border-white border-opacity-0 border-b-4 py-2 duration-300 ${location.pathname === '/about' ? 'border-opacity-100' : 'border-opacity-0'}`}>About</Link>
                        <Link to="/services" className={`hover:border-opacity-100 w-fit border-white border-opacity-0 border-b-4 py-2 duration-300 ${location.pathname === '/services' ? 'border-opacity-100' : 'border-opacity-0'}`}>Services</Link>
                        <Link to="/ideas" className={`hover:border-opacity-100 w-fit border-white border-opacity-0 border-b-4 py-2 duration-300 ${location.pathname === '/ideas' ? 'border-opacity-100' : 'border-opacity-0'}`}>Ideas</Link>
                        <Link to="/careers" className={`hover:border-opacity-100 w-fit border-white border-opacity-0 border-b-4 py-2 duration-300 ${location.pathname === '/careers' ? 'border-opacity-100' : 'border-opacity-0'}`}>Careers</Link>
                        <Link to="/contact" className={`hover:border-opacity-100 w-fit border-white border-opacity-0 border-b-4 py-2 duration-300 ${location.pathname === '/contact' ? 'border-opacity-100' : 'border-opacity-0'}`}>Contact</Link>
                    </div>
                </div>):(null)}
            </div>
        </div>
    </header>
    </>
  )
}

export default Header