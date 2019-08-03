import React, {Fragment} from 'react';

import './header.css';

import { Link } from 'react-router-dom';

import logo from '../../images/logo.png';
import SearchPanel from  '../search-panel';


const Header = () => {
  return (
    <header className='d-flex'>
      <nav id="navbar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
          <li>Blog <i className="fas fa-angle-down"></i>
            <ul>
              <li><Link to='/my-post'>My post</Link><span>17 Posts</span></li>
              <li><Link to='/create-post'>Create post</Link> <span>23 Posts</span></li>
            </ul>
          </li>
        </ul>
      </nav>

      <SearchPanel />

    </header>
  )
};

export default Header;