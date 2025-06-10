import { Link, Outlet } from '@tanstack/react-router';
import ViteLogo from 'assets/images/vite-logo.svg?react';
import VitestLogo from 'assets/images/vitest-logo.svg?react';

import logo from 'assets/images/logo.svg';
import './Layout.css';

export const Layout = () => {
  return (
    <div className="app">
      <nav className="app__navigation">
        <ul className="app__menu">
          <li className="app__menu-item">
            <Link className="app__menu-link" to={'/'}>
              Home
            </Link>
          </li>
          <li className="app__menu-item">
            <Link className="app__menu-link" to={'/about'}>
              About
            </Link>
          </li>
          <li className="app__menu-item">
            <Link className="app__menu-link" to={'/users'}>
              Users
            </Link>
          </li>
          <li className="app__menu-item">
            <Link className="app__menu-link" to={'/help'}>
              Help
            </Link>
          </li>
          <li className="app__menu-item">
            <Link className="app__menu-link" to={'/tableau'}>
              tableau
            </Link>
          </li>
        </ul>
      </nav>
      <main className="app__main">
        <Outlet />
      </main>
    </div>
  );
};
