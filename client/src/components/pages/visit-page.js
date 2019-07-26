import React, { Component } from 'react';

import VisitHeader from '../visit-header';
import Post from '../post';
import Footer from '../footer';
import ErrorHandler from '../error-handler';

import BonaService from '../../services/bona-service';
const bonaService = new BonaService();

export default class VisitPage extends Component{

  state = {
    posts: null,
    term: 'some',
    err: false
  };

  constructor() {
    super();
  }

  async postInit () {
    try {
      const { data } = await bonaService.getPosts();
      const posts = data.map((e) => <Post data={e} />);
      this.setState({ posts });
    } catch (e) {
      this.setState({ err: true })
    }

  };

  componentDidMount() {
    this.postInit();
  }

  render() {
    const { posts, err } = this.state;
    const post = posts ? posts : null;
    const error = err ? <ErrorHandler /> : null;

    return (
      <div>
        <VisitHeader />
        <section className="blog-area section">
          <div className="container">
            <div className="row">
              { post }
              { error }
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }
};