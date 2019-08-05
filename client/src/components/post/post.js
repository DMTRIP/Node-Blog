import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import './post.css'

import ErrorHandler from "../error-handler";
import LoadMoreBtn from '../load-more-btn';
import Spinner from '../spinner';
import PostItem from '../post-item';
import BonaService from '../../services/bona-service';
import CreatePostPage from "../pages/create-post-page";
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
    const { pageNum } = this.state;
      this.init(pageNum);
  }

  async init (pageNum) {
    const { getPost } = this.props;
    const { postData } = this.state;

    try {
      const { data } = await getPost(pageNum);
      const postDataApi = data.map((e) => {
        let isLike = false;
        console.log(e.likes.length);
        if(e.likes.length > 0) {
          console.log(1);
          const id = localStorage.getItem('id');
          e.likes.map(e => {
            if(e.author === id) isLike = true;
          });
        }
        return {
          id: e._id,
          like: isLike,
          data: e,
        }
      });

      if(postData) {
        this.setState(({ postData }) => {
          const oldArr = [...postData];
          const newArr = [...postData, ...postDataApi];

          return {
            postData: newArr
          };
        });
      } else {
        this.setState({ postData: postDataApi });
      }

    } catch (e) {
      this.setState({ err: true })
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

  nextPage = (pageNum) => {
    this.setState(({ pageNum }) => {
      let newNum = pageNum;
      newNum++;
      return {
        pageNum: newNum
      }
    });
    this.init(pageNum);
  };

  render() {
    const { postData, pageNum, edit, err } = this.state;

    const { loadBtn, ownPost } = this.props;

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
    const loadMore = loadBtn ? <LoadMoreBtn nextPage={this.nextPage} pageNum={pageNum} /> : null;

    return (
      <Fragment>
        <section className="blog-area section">
          <div className="container">
            <div className="row">
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