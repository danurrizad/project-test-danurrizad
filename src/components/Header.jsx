import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
    const location = useLocation();
    const [isHeaderVisible, setHeaderVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
    const [background, setBackground] = useState('primary1');

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        const isScrollingUp = prevScrollPos > currentScrollPos;

        setHeaderVisible(isScrollingUp || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);

        //     // Perbarui warna latar belakang berdasarkan kondisi scroll
        // if (currentScrollPos > 20) {
        //     setBackground('primary1'); // Ganti dengan warna latar belakang yang diinginkan
        //   } else {
        //     setBackground('transparent');
        //   }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    const headerClasses = `z-10 fixed top-0 w-full h-[10vh] bg-primary1 px-20 transition-transform duration-500 ${
        isHeaderVisible ? 'translate-y-0 opacity-80' : 'opacity-0 -translate-y-full'
      } ${background === 'transparent' ? 'bg-transparent text-primary1' : `bg-${background} text-white`
    }`;

    const imgLogo = `${background === 'transparent'} ? '/img/logo-2.png' : '/img/logo.png'`

  return (
    <>
    <header className={headerClasses}>
        <div className='flex justify-between items-center h-full'>
            <Link to='/'>
                {background === 'transparent' ?  (
                    <img src={`/img/logo-2.png`} className='h-[40px]' alt="logo-suitmedia" />
                ):(<img src={`/img/logo.png`} className='h-[40px]' alt="logo-suitmedia" />)}
            </Link>
            <div className='flex justify-center gap-10  text-[16px] font-bold'>
                <Link to="/work" className={`hover:border-opacity-100 ${background === 'transparent' ? 'border-primary1' : 'border-white'} border-opacity-0 border-b-4 py-2 duration-300 ${location.pathname === '/work' ? 'border-opacity-100' : 'border-opacity-0'}`}>Work</Link>
                <Link to="/about" className={`hover:border-opacity-100 ${background === 'transparent' ? 'border-primary1' : 'border-white'} border-opacity-0 border-b-4 py-2 duration-300 ${location.pathname === '/about' ? 'border-opacity-100' : 'border-opacity-0'}`}>About</Link>
                <Link to="/services" className={`hover:border-opacity-100 ${background === 'transparent' ? 'border-primary1' : 'border-white'} border-opacity-0 border-b-4 py-2 duration-300 ${location.pathname === '/services' ? 'border-opacity-100' : 'border-opacity-0'}`}>Services</Link>
                <Link to="/ideas" className={`hover:border-opacity-100 ${background === 'transparent' ? 'border-primary1' : 'border-white'} border-opacity-0 border-b-4 py-2 duration-300 ${location.pathname === '/ideas' ? 'border-opacity-100' : 'border-opacity-0'}`}>Ideas</Link>
                <Link to="/careers" className={`hover:border-opacity-100 ${background === 'transparent' ? 'border-primary1' : 'border-white'} border-opacity-0 border-b-4 py-2 duration-300 ${location.pathname === '/careers' ? 'border-opacity-100' : 'border-opacity-0'}`}>Careers</Link>
                <Link to="/contact" className={`hover:border-opacity-100 ${background === 'transparent' ? 'border-primary1' : 'border-white'} border-opacity-0 border-b-4 py-2 duration-300 ${location.pathname === '/contact' ? 'border-opacity-100' : 'border-opacity-0'}`}>Contact</Link>
            </div>
        </div>
    </header>
    </>
  )
}

export default Header