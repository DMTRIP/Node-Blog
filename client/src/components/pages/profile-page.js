import React, { Fragment } from 'react';

import Header from '../header';
import Footer from '../footer';
import ProfileInfo from '../profile-info';

const ProfilePage = () => {

  return (
    <Fragment>
      <Header />
        <ProfileInfo />
      <Footer />
    </Fragment>
  )
};

export default ProfilePage;