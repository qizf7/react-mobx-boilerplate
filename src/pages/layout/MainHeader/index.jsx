import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './style.css';

class MainHeader extends React.Component {
  render() {
    return (
      <header className={styles.mainHeader}>
        <nav>
          <ul className={styles.mainMenu}>
            <li>
              <NavLink to="/home" exact>
Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/home/detail">
Home detail
              </NavLink>
            </li>
            <li>
              <NavLink to="/main">
Main
              </NavLink>
            </li>
            <li>
              <NavLink to="/alone">
Alone
              </NavLink>
            </li>
            <li>
              <NavLink to="/about">
About
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default MainHeader;
