import React, { Component, Fragment } from 'react';

import Header from '../header';
import Footer from '../footer';

import { PostPage } from "../post-commponents";

const MyPost = ({ history }) => {
  return (
    <Fragment>
      <Header />
            <PostPage
                  ownPost={true}
                  history={history}/>
      <Footer />
    </Fragment>
  )
};

export default MyPost;

