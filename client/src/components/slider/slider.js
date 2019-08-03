import React, { Fragment } from 'react';


import './slider.css'
const Slider = (img) => {
  console.log(img.img);
  return (
    <div className="slider">
      <div className="display-table  center-text">
        <img src={img} alt="mlkmlkmklmlkmlkmlkmlkmlkmlmklmlkmlmlmlmlmlmlm"/>
        <h1 className="title display-table-cell"><b>DESIGN</b></h1>
      </div>
    </div>
  )
};

export default Slider;