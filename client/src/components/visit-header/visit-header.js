import React, { Component } from 'react';

import logo from '../../images/logo.png';

import SearchPanel from '../search-panel';
import Login from '../login';

import './visit-header.css';
export default class VisitHeader extends Component{

 render() {
  const { onLogin, onSignUp } = this.props;

   return (
     <header>
       <div className="container-fluid justify-content-between pl-0 d-flex position-relative no-side-padding">
         <SearchPanel />
         <div className='d-flex flex-row-reverse'>
           <a href="#" className="logo"><img src={logo} alt="Logo Image" /></a>

           <div className="menu-nav-icon" data-nav-menu="#main-menu"><i className="ion-navicon"></i></div>

           <ul className="main-menu visible-on-click" id="main-menu">
             <li><a href="#"  onClick={onSignUp}><i className="fas fa-users" > </i> SigIn Up</a></li>
             <li><a href="#" onClick={onLogin}><i className="fas fa-sign-in-alt"> </i> Login</a></li>
           </ul>
         </div>


       </div>

     </header>
   )
 }
};

