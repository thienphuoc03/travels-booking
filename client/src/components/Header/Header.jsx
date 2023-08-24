import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { logo } from '../../assets/images';
import Button from '../ui/Button';

const menu = [
  {
    path: '/home',
    display: 'Home',
  },
  {
    path: '/about',
    display: 'About',
  },
  {
    path: '/tours',
    display: 'Tours',
  },
  {
    path: '/contact',
    display: 'Contact',
  },
];

const Header = () => {
  return (
    <header className="flex justify-center items-center w-full fixed py-4 px-5 top-0 left-0 z-50 shadow-sm bg-white">
      <div className="grid grid-cols-2 w-[1024px]">
        {/* left header */}
        <div className="logo">
          <Link to="/home" title="home">
            <img src={logo} alt="logo" className="w-auto h-36" />
          </Link>
        </div>

        {/* right header */}
        <div className="flex justify-between items-center">
          <div className="flex">
            <ul className="flex justify-center items-center gap-4">
              {menu.map((item, index) => (
                <li
                  className="font-medium cursor-pointer p-4 hover:text-amber-500 hover:underline"
                  key={index}>
                  <NavLink
                    to={item.path}
                    className={navClass =>
                      navClass.isActive ? 'text-amber-500 underline' : ''
                    }>
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-4">
              <Button variant="ghost" className="rounded-full">
                <Link to="/login">Login</Link>
              </Button>
              <Button className="bg-amber-500 rounded-full">
                <Link to="/login">Register</Link>
              </Button>
            </div>

            {/* mobile menu */}
            <span className="ml-4 cursor-pointer">
              <FontAwesomeIcon icon={faBars} />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
