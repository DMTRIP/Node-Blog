import React, { Fragment } from 'react';

import Header from '../header';
import Footer from  '../footer';
import Slider from '../slider';
import SinglePostMain from '../single-post-main';
import Sidebar from '../sidebar';
import RecommendedPost from '../recommended-post';
import Comment from "../comment";


const SinglePostPage = ({ postId, isLogin}) => {
  const Head = isLogin ? <Header /> : null;
  return (
    <Fragment>
      { Head }
        <Slider />

      <section className="post-area section">
        <div className="container">
          <div className="row">
            <SinglePostMain postId={postId} />
            <Sidebar />
          </div>
        </div>
      </section>

      <RecommendedPost />
      <Comment />
      <Footer />
    </Fragment>
  );
};

export default SinglePostPage;