import React from 'react';

import './error-handler.css'
const ErrorHandler = () => {
  return (
    <div className='error-handler'>
      <span className='glitch'>BOOM!!!</span>
      <span>something has gone terribly wrong</span>
      <span>but we already sent droids to fix it</span>
    </div>
  );
};

export default ErrorHandler;