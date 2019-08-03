import React, { Fragment } from 'react';

import Header from '../header';
import Post from '../post';
import Footer from '../footer';
import BonaService from '../../services/bona-service';
const bonaService = new BonaService();

const HomePage = () => {
  return (
    <Fragment>
      <Header />
      <Post getPost={bonaService.postPage} loadBtn={true} />
      <Footer />
    </Fragment>
  )
};

export default HomePage;