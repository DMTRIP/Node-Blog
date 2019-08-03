import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import './post.css'

import ErrorHandler from "../error-handler";
import LoadMoreBtn from '../load-more-btn';
import Spinner from '../spinner';


class Post extends Component {

  state = {
    posts: null,
    pageNum: 0,
    err: false
  };

  componentDidMount() {
    const { pageNum } = this.state;

    if(pageNum) {
      this.InitPage(pageNum)
    } else {
      this.Init();
    }
  }

  async Init () {
    const { getPost } = this.props;
    try {
      const { data } = await getPost();
      const posts = data.map((e) => {
        const singlePostRoute = (id) => {
          this.props.history.push(`/single-post/${id}`);
        };
        return (
          <div className="col-lg-4 col-md-6">
            <div className="card h-100">
              <div className="single-post post-style-1">

                <div onClick={() => singlePostRoute(e._id)} className="blog-image"><img src={e.preview} alt="Blog Image" /></div>

                <a className="avatar" href="#"><img src={e.authorAvatar} alt="Profile Image" /></a>

                <div className="blog-info">

                  <h4 onClick={() => singlePostRoute(e._id)}  className="title"><a href="#"><b>{e.title}</b></a></h4>

                  <ul className="post-footer">
                    <li><a href="#"><i className="fas fa-heart"></i>{e.likes}</a></li>
                    <li><a href="#"><i className="fas fa-comment"></i>{e.comments}</a></li>
                    <li><a href="#"><i className="fas fa-eye"></i>{e.views}</a></li>
                  </ul>

                </div>
              </div>
            </div>
          </div>
        )
      });
      this.setState({ posts });
    } catch (e) {
      this.setState({ err: true })
    }

  };

  InitPage = async (pageNum) => {
    const { getPost } = this.props;
    try {
      const { data } = await getPost(pageNum);
      console.log(data);
      const post = data.map((e) => {
        const singlePostRoute = (id) => {
          this.props.history.push(`/single-post/${id}`);
        };
        return (
          <div className="col-lg-4 col-md-6">
            <div className="card h-100">
              <div className="single-post post-style-1">

                <div onClick={() => singlePostRoute(e._id)} className="blog-image"><img src={e.preview} alt="Blog Image" /></div>

                <a className="avatar" href="#"><img src={e.authorAvatar} alt="Profile Image" /></a>

                <div className="blog-info">

                  <h4 onClick={() => singlePostRoute(e._id)}  className="title"><a href="#"><b>{e.title}</b></a></h4>

                  <ul className="post-footer">
                    <li><a href="#"><i className="fas fa-heart"></i>{e.likes}</a></li>
                    <li><a href="#"><i className="fas fa-comment"></i>{e.comments}</a></li>
                    <li><a href="#"><i className="fas fa-eye"></i>{e.views}</a></li>
                  </ul>

                </div>
              </div>
            </div>
          </div>
        )
      });
      this.setState(({ posts }) => {
        if(!posts) return { posts: post };
        const newArr = [
          ...posts,
          ...post
        ];
        return {posts: newArr}
      });


    } catch (e) {
      this.setState({ err: true })
    }

  };



  nextPage = (pageNum) => {
    this.setState(({ pageNum }) => {
      let newNum = pageNum;
      newNum++;
      return {
        pageNum: newNum
      }
    });
    this.InitPage(pageNum);
  };



  render() {
    const { posts, pageNum, err } = this.state;

    const { loadBtn } = this.props;

    const msg  = err ? <ErrorHandler /> : null;
    const loadMore = loadBtn ? <LoadMoreBtn nextPage={this.nextPage} pageNum={pageNum} /> : null;
    const spinner = posts ? null : <Spinner />;
    return (
      <Fragment>
        <section className="blog-area section">
          <div className="container">
            <div className="row">
              {spinner}
              { posts }
              { msg }
              {loadMore}
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
};
export default withRouter(Post);