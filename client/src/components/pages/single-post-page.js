import React, { Fragment, Component } from 'react';

import Header from '../header';
import Footer from  '../footer';
import Slider from '../slider';
import SinglePostMain from '../single-post-main';
import Sidebar from '../sidebar';
import RecommendedPost from '../recommended-post';
import Comment from "../comment";
import Spinner from '../spinner';
import ErrorHandler from "../error-handler";
import BonaService from '../../services/bona-service';

const bonaService = new BonaService();

export default class SinglePostPage extends Component {

  state = {
    post: null,
    err: false,
  };

  async componentDidMount() {
    try {
      const { data } = await bonaService.getPost(this.props.postId);
      this.setState({ post: data });
    } catch (e) {
      this.setState({ err: true });
    }
  }

  render() {
    const { post, err } = this.state;

    if(!post) return <Spinner />;
    if(err) return <ErrorHandler />;

    const { isLogin } = this.props;
    const Head = isLogin ? <Header /> : null;

    return (
      <Fragment>
        { Head }
        <Slider />

        <section className="post-area section">
          <div className="container">
            <div className="row">
              <SinglePostMain post={post} />
              <Sidebar />
            </div>
          </div>
        </section>

        <RecommendedPost />
        <Comment />
        <Footer />
      </Fragment>
    );
};

};
