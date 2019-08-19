import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withBonaService } from '../hoc-helpers';


import ErrorHandler from "../error-handler";
import LoadMoreBtn from '../load-more-btn';
import Spinner from '../spinner';
import PostItem from '../post-item';
import { setPostData, likeRequest } from '../../actions';

import './post.css'


class Post extends Component {


componentDidMount() {
    const { pageData, setPostData } = this.props;
     setPostData(pageData)
  };

componentDidUpdate(prevProps) {
    if(this.props.pageData !== prevProps.pageData) {
      this.props.setPostData(this.props.pageData)
    }
  };

onDelete = async (id) => {
  // this.setState(({ postData }) => {
  //   const idx = postData.findIndex(e => e.id === id);
  //   const oldArr = [...postData];
  //
  //   const before = oldArr.splice(0, idx);
  //   const after = oldArr.splice(idx + 1);
  //
  //   const newArr = [...before, ...after];
  //
  //   return {
  //     postData: newArr
  //   }
  // });
  // bonaService.deletePost(id);
};

onEdit = (id) => {

};

onLike = (id) => {
  this.props.addLike(id);
};

singlePostRoute = (id) => {
    this.props.history.push(`/single-post/${id}`);
  };


  render() {
    const { postData, pageNum, err } = this.props;

    const { ownPost, nextPage } = this.props;

    if(!postData) return <Spinner />;

    const posts = postData.map(e  => {
      return(  <PostItem postData={e}
                         singlePostRoute={this.singlePostRoute}
                         onLike={this.onLike}
                         ownPost={ownPost}
                         onDelete={this.onDelete}
                         onEdit={this.onEdit}/>)
    });

    const msg  = err ? <ErrorHandler /> : null;

    return (
      <Fragment>
        <section className="blog-area section">
          <div className="container">
            <div className="row">
              { posts }
              { msg }
              <LoadMoreBtn nextPage={nextPage} pageNum={pageNum} />
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
};

const mapStateToProps = ({post: { postData, like, err }}) => {
  return { postData, like, err  }
};

const mapDispatchToProps = (dispatch, { bonaService }) => {
  return {
    setPostData: (data) => dispatch(setPostData(data)),
    addLike: likeRequest(dispatch, bonaService)
  }
};

export default compose(
  withBonaService(),
  connect(mapStateToProps, mapDispatchToProps)
)(Post);
