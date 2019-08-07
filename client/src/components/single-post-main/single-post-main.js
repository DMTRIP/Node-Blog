import React, { Fragment, Component } from 'react';

import PostInfo from '../post-info';
import './single-post-main.css';

const SinglePostMain  = ({ post })  =>  {
  const { title, comments, likes, views, body } = post;
  console.log(post);
  return (
      <Fragment>
        <div className="col-lg-8 col-md-12 no-right-padding">

          <div className="main-post">

            <div className="blog-post-inner">
              <div className="blog-post-inner">

                <PostInfo post={post} />

                <h3 className="title"><a href="#"><b>{title}</b></a></h3>

                <div className='para' dangerouslySetInnerHTML={{ __html: body }} />

                <ul className="tags">
                  <li><a href="#">Mnual</a></li>
                  <li><a href="#">Liberty</a></li>
                  <li><a href="#">Recommendation</a></li>
                  <li><a href="#">Inspiration</a></li>
                </ul>
              </div>

              <div className="post-icons-area">
                <ul className="post-icons">
                  <li><a href="#"><i className="fas fa-heart"></i>{likes.length}</a></li>
                  <li><a href="#"><i className="fas fa-comment"></i>{comments.length}</a></li>
                  <li><a href="#"><i className="fas fa-eye"></i>{views}</a></li>
                </ul>

                <ul className="icons">
                  <li>SHARE :</li>
                  <li><a href="#"><i className="ion-social-facebook"></i></a></li>
                  <li><a href="#"><i className="ion-social-twitter"></i></a></li>
                  <li><a href="#"><i className="ion-social-pinterest"></i></a></li>
                </ul>
              </div>

              <PostInfo post={post}  />

            </div>
          </div>
        </div>
      </Fragment>

    )

};

      export default SinglePostMain;