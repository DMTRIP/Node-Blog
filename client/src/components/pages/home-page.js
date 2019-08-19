import React, { Fragment } from 'react';

import Header from '../header';
import Footer from '../footer';
import { PostPage } from "../post-commponents";

const HomePage = () => {
  return (
    <Fragment>
      <Header />
        <PostPage />
      <Footer />
    </Fragment>
  )
};

export default HomePage;