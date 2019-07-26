import React, {Fragment} from 'react';

import './header.css';

import logo from '../../images/logo.png';
import SearchPanel from  '../search-panel';


const Header = () => {
  return (
    <header className='d-flex'>
      <nav id="navbar">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
          <li>Blog <i className="fas fa-angle-down"></i>
            <ul>
              <li><a href="#">My post</a> <span>17 Posts</span></li>
              <li><a href="#">Favorite</a> <span>23 Posts</span></li>
              <li><a href="#">Create post</a> <span>23 Posts</span></li>
            </ul>
          </li>
        </ul>
      </nav>

      <SearchPanel />

    </header>
  )
};

export default Header;