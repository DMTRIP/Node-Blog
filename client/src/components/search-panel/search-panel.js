import React from 'react';

import './search-panel.css';
const SearchPanel = () => {
  return (
    <div className="src-area">
      <form>
        <button className="src-btn" type="submit"><i className="far fa-search"></i></button>
        <input className="src-input" type="text" placeholder="Type of search" />
      </form>
    </div>
  )
};

export default SearchPanel;