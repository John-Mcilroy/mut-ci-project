import React from 'react'

import logo from '../assets/placeholder-logo.png';

function Navbar() {
  return (
    <nav>
      <img className="nav__logo" src={logo} alt='' />
      <ul className="nav__list">
        <li className="nav__list-item">Home</li>
        <li className="nav__list-item">Perf. Tracker</li>
        <li className="nav__list-item nav__list-item__active">Active</li>
      </ul>
        <a href="#" style={{textDecoration: 'none'}} className="nav__list-item nav__logout">Log Out</a>
    </nav>
  )
}

export default Navbar;