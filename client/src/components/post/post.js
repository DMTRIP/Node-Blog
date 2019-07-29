import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import './post.css'

import { withData } from '../hoc-helpers';
import ErrorHandler from "../error-handler";



 class Post extends Component {

  state = {
    posts: null,
    err: false
  };

  PostHtml = (data, history) => {
     const { data: { authorAvatar, comments, likes, preview, title, views, _id } } = data;
     console.log(data);
     const singlePostRoute = (id) => {
       history.push(`/sing-post/${id}`);
     };

     return (
       <div className="col-lg-4 col-md-6">
         <div className="card h-100">
           <div className="single-post post-style-1">

             <div onClick={() => singlePostRoute(_id)} className="blog-image"><img src={preview} alt="Blog Image" /></div>

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

  componentDidMount() {
    this.Init();
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

                  <h4 className="title"><a href="#"><b>{e.title}</b></a></h4>

                  <ul className="post-footer">
                    <li><a href="#"><i className="fas fa-heart"></i>{e.likes}</a></li>
                    <li><a href="#"><i className="fas fa-comment"></i>1</a></li>
                    <li><a href="#"><i className="fas fa-eye"></i>{ e.views }</a></li>
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
  export default withRouter(Post);