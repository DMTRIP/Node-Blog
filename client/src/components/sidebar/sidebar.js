import React from 'react';

const Sidebar = () => {
  return (
    <div className="col-lg-4 col-md-12 no-left-padding">
      <div className="single-post info-area">
        <div className="sidebar-area about-area">
          <h4 className="title"><b>ABOUT BONA</b></h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur
            Ut enim ad minim veniam
          </p>
        </div>
        <div className="sidebar-area subscribe-area">
          <h4 className="title"><b>SUBSCRIBE</b></h4>
          <div className="input-area">
            <form>
              <input className="email-input" type="text" placeholder="Enter your email" />
              <button className="submit-btn" type="submit"><i className="icon ion-ios-email-outline"></i></button>
            </form>
          </div>
        </div>
        <div className="tag-area">
          <h4 className="title"><b>TAG CLOUD</b></h4>
          <ul>
            <li><a href="#">Manual</a></li>
            <li><a href="#">Liberty</a></li>
            <li><a href="#">Recomendation</a></li>
            <li><a href="#">Interpritation</a></li>
            <li><a href="#">Manual</a></li>
            <li><a href="#">Liberty</a></li>
            <li><a href="#">Recomendation</a></li>
            <li><a href="#">Interpritation</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
};

export default Sidebar;