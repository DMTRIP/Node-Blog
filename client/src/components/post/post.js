import React, { Component, Fragment } from 'react';
import './post.css'


import ErrorHandler from "../error-handler";
import LoadMoreBtn from '../load-more-btn';
import Spinner from '../spinner';
import PostItem from '../post-item';
import BonaService from '../../services/bona-service';
const bonaService = new BonaService();


class Post extends Component {

  state = {
    postData: null,
    pageNum: 0,
    like: false,
    edit: false,
    err: false
  };

  componentDidMount() {
    const { pageData } = this.props;
    this.setState({ postData: pageData });
  };

  componentDidUpdate(prevProps) {
    if(this.props.pageData !== prevProps.pageData) {
      this.setState({ postData: this.props.pageData })
    }
  };

onDelete = async (id) => {
  this.setState(({ postData }) => {
    const idx = postData.findIndex(e => e.id === id);
    const oldArr = [...postData];

    const before = oldArr.splice(0, idx);
    const after = oldArr.splice(idx + 1);

    const newArr = [...before, ...after];

    return {
      postData: newArr
    }
  });
  bonaService.deletePost(id);
};

onEdit = (id) => {
  this.setState({ edit: id });
};

onLike = async (id) => {
  this.setState(({ postData })  => {
    const idx = postData.findIndex(e => e.id === id);
    console.log(idx);
    const oldPost = postData[idx];

    const newPost = {...oldPost, like: !oldPost.like};

    if(oldPost.like) {
      newPost.data.likes.pop();
    } else {
      newPost.data.likes.push(1);
    }
    const newArr = [
      ...postData.slice(0, idx),
      newPost,
      ...postData.slice(idx + 1)
    ];

    return {
      postData: newArr
    }

  });

  const { postData } = this.state;

  const idx = postData.findIndex(e => e.id === id);
  const oldPost = postData[idx];

  if(oldPost.like) {
        await bonaService.deleteLikeFromPost(oldPost.id);
    } else {
      await bonaService.addLikeToPost(oldPost.id);
    }
  console.log(this.state.postData);
};

singlePostRoute = (id) => {
    this.props.history.push(`/single-post/${id}`);
  };


  render() {
    const { postData, pageNum, edit, err } = this.state;

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
export default Post;