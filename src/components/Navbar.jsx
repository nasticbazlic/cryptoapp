import { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
import icon from '../images/cryptocurrency.png';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize > 768) {
      setActiveMenu(true);
    } else {
      setActiveMenu(false);
    }
  }, [screenSize]);

  const handleMenuClick = () => {
    if (screenSize <= 768) {
      setActiveMenu(false);
    }
  };

  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Avatar src={icon} size='large' />
        <Typography.Title level={2} className='logo'>
          <Link to='/'> Cryptoverse </Link>
        </Typography.Title>
        <Button className='menu-control-container' onClick={() => setActiveMenu(!activeMenu)}>
          <MenuOutlined />
        </Button>
      </div>

      {activeMenu && (
        <Menu theme='dark'>
          <Menu.Item icon={<HomeOutlined />} onClick={handleMenuClick}>
            <Link to='/'> Home </Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />} onClick={handleMenuClick}>
            <Link to='/cryptocurrencies'> Cryptocurrencies </Link>
          </Menu.Item>
          <Menu.Item icon={<MoneyCollectOutlined />} onClick={handleMenuClick}>
            <Link to='/exchanges'> Exchanges </Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />} onClick={handleMenuClick}>
            <Link to='/news'> News </Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;