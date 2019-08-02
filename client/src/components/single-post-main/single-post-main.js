import React, { Fragment, Component } from 'react';

import PostInfo from '../post-info';
import './single-post-main.css';

const SinglePostMain  = ({ post })  =>  {
  const { title, comments, likes, views } = post;
  console.log(post);

  return (
      <Fragment>
        <div className="col-lg-8 col-md-12 no-right-padding">

          <div className="main-post">

            <div className="blog-post-inner">
              <div className="blog-post-inner">

                <PostInfo />

                <h3 className="title"><a href="#"><b>{title}</b></a></h3>


                <ul className="tags">
                  <li><a href="#">Mnual</a></li>
                  <li><a href="#">Liberty</a></li>
                  <li><a href="#">Recommendation</a></li>
                  <li><a href="#">Inspiration</a></li>
                </ul>
              </div>

              <div className="post-icons-area">
                <ul className="post-icons">
                  <li><a href="#"><i className="ion-heart"></i>{likes.length}</a></li>
                  <li><a href="#"><i className="ion-chatbubble"></i>{comments.length}</a></li>
                  <li><a href="#"><i className="ion-eye"></i>{views.length}</a></li>
                </ul>

                <ul className="icons">
                  <li>SHARE :</li>
                  <li><a href="#"><i className="ion-social-facebook"></i></a></li>
                  <li><a href="#"><i className="ion-social-twitter"></i></a></li>
                  <li><a href="#"><i className="ion-social-pinterest"></i></a></li>
                </ul>
              </div>

              <PostInfo />

            </div>
          </div>
        </div>
      </Fragment>

    )

};

      export default SinglePostMain;