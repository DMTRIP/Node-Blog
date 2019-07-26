import React from 'react';

import './user-massage.css';

const UserMassage = (props) => {
  const { type, label } = props;

  let divClassname = '';
  let iconClassname = '';

  if(type === 'err') {
    divClassname = 'error-msg';
    iconClassname = 'fa fa-times-circle';
  } else if (type === 'warning') {
    divClassname = 'warning-msg';
    iconClassname = 'fa fa-warning';
  } else if (type === 'success') {
    divClassname = 'success-msg';
    iconClassname = 'fa fa-check';
  } else if (type === 'info') {
    divClassname = 'info-msg';
    iconClassname = 'fa fa-info-circle';
  }



  return  (
    <div class={divClassname}>
      <i class={iconClassname}> </i>
        {label}
      </div>
  )
};

export default UserMassage;