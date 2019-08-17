import React, { Fragment } from 'react';


import './slider.css'
const Slider = ({ img, title }) => {
  return (
    <div style={{ backgroundImage: `url(${img})` }} className="slider">
      <div className="display-table  center-text">
        <h1 className="title display-table-cell"><b>{title}</b></h1>
      </div>
    </div>
  )
};

export default Slider;