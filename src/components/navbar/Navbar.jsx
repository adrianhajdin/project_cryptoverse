
import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { FcCurrencyExchange } from 'react-icons/fc';
import { SiMarketo } from 'react-icons/si';
import { BiNews } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import './navbar.css';

export const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <h2 className="logo">Cryptoverse</h2>
        <div className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><AiOutlineMenu /></div>
      </div>
      {activeMenu && (
        <Menu mode="inline">
          <Menu.Item key="1" icon={<AiFillHome />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FcCurrencyExchange />}>
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<SiMarketo />}>
            <Link to="/Markets">Markets</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<BiNews />}>
            <Link to="/news">News</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

