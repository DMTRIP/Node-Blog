import React, { Component, Fragment } from 'react';

import './post.css'

import { withData } from '../hoc-helpers';
import ErrorHandler from "../error-handler";

const PostHtml = (data) => {
  const { data: { authorAvatar, comments, likes, preview, title, views } } = data;

  return (
    <div className="col-lg-4 col-md-6">
      <div className="card h-100">
        <div className="single-post post-style-1">

            <div className="blog-image"><img src={preview} alt="Blog Image" /></div>

            <a className="avatar" href="#"><img src={authorAvatar} alt="Profile Image" /></a>

              <div className="blog-info">

                <h4 className="title"><a href="#"><b>{title}</b></a></h4>

                <ul className="post-footer">
                  <li><a href="#"><i className="fas fa-heart"></i>{likes}</a></li>
                  <li><a href="#"><i className="fas fa-comment"></i>{comments.length}</a></li>
                  <li><a href="#"><i className="fas fa-eye"></i>{ views }</a></li>
                </ul>

              </div>
          </div>
        </div>
      </div>
  )
};

export default class Post extends Component {

  state = {
    posts: null,
    err: false
  };

  componentDidMount() {
    this.Init();
  }

  async Init () {
    const { getPost } = this.props;
    try {
      const { data } = await getPost();
      const posts = data.map((e) => <PostHtml data={e} />);
      this.setState({ posts });
    } catch (e) {
      this.setState({ err: true })
    }

  };



  render() {
    const { posts, err } = this.state;
    const msg  = err ? <ErrorHandler /> : null;
    return (
      <Fragment>
        <section className="blog-area section">
          <div className="container">
            <div className="row">
              { posts }
              { msg }
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
};