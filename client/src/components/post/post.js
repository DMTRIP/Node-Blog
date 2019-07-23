import React, { Component} from 'react';

import blogImage from '../../images/marion-michele-330691.jpg';
import Avatar from '../../images/icons8-team-355979.jpg';
import './post.css'

export default class Post extends Component {

  render() {
    const { data: { authorAvatar, comments, likes, preview, title, views } } = this.props;

    return(

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
}
};
