import React, { Component, Fragment } from 'react';

import Header from '../header';
import Post from '../post';
import Footer from '../footer';
import BonaService from '../../services/bona-service';

const MyPost = () => {
  const bonaService = new BonaService();
  return (
    <Fragment>
      <Header />
            <Post getPost={bonaService.getMyPost}/>
      <Footer />
    </Fragment>
  )
};

export default MyPost;

