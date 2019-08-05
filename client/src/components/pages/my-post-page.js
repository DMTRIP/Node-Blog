import React, { Component, Fragment } from 'react';

import Header from '../header';
import Post from '../post';
import Footer from '../footer';
import BonaService from '../../services/bona-service';

const MyPost = ({ history }) => {
  const bonaService = new BonaService();
  return (
    <Fragment>
      <Header />
            <Post getPost={bonaService.myPostPage}
                  loadBtn={true}
                  ownPost={true}
                  history={history}/>
      <Footer />
    </Fragment>
  )
};

export default MyPost;

