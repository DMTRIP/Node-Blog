import React from 'react';

import './load-more-btn.css';

const LoadMoreBtn = (props) => {
  const { nextPage, pageNum } = props;
  return (
    <div className='load-more-div'>
      <p onClick={() => nextPage(pageNum + 1)} className="load-more-btn" href="#"><b>LOAD MORE</b></p>
    </div>
  );
};

export default LoadMoreBtn;