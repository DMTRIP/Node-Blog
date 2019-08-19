import React, { Fragment, Component } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { withBonaService } from '../hoc-helpers';
import { fetchPost } from '../../actions';


import Header from '../header';
import Footer from  '../footer';
import Slider from '../slider';
import SinglePostMain from '../single-post-main';
import Sidebar from '../sidebar';
import RecommendedPost from '../recommended-post';
import Comment from "../comment";
import Spinner from '../spinner';
import ErrorHandler from "../error-handler";



const SinglePostPage = ({ post, head, postId }) => {
  console.log(post);
  return (
    <Fragment>
      {head}
      <Slider img={post.preview} title={post.title}/>
      <section style={{ marginBottom: '2rem' }} className="post-area section">
        <div className="container">
          <div className="row">
            <SinglePostMain post={post} />
            <Sidebar />
          </div>
        </div>
      </section>

      <RecommendedPost />
      <Comment postId={postId}/>
      <Footer />
    </Fragment>
  );
};

 class SinglePostPageContainer extends Component {

   componentDidMount() {
    this.props.fetchPost(this.props.postId);
  }

  render() {
    const { post, loading, err, postId } = this.props;

    if(loading) return <Spinner />;

    if(err) return <ErrorHandler />;

    const { isLogin } = this.props;
    const head = isLogin ? <Header /> : null;

    return <SinglePostPage post={post} head={head} postId={postId} />
};

};

const mapStateToProps = ({ singlePost: { post, loading, err } }) => {
  return { post, loading, err }
};

const mapDispatchToProps = (dispatch, { bonaService }) => {
  return {
    fetchPost: fetchPost(bonaService, dispatch)
  }
};

export default compose(
  withBonaService(),
  connect(mapStateToProps, mapDispatchToProps)
)(SinglePostPageContainer)