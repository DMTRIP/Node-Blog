import React, { Component } from 'react';

import VisitHeader from '../visit-header';
import Post from '../post';
import Footer from '../footer';

import BonaService from '../../services/bona-service';
const bonaService = new BonaService();

export default class App extends Component{

  state = {
    posts: null
  };

  constructor() {
    super();
    this.postInit();
  }

  postInit = async () => {
    const { data } = await bonaService.getPosts();
    console.log(data);
    const posts = data.map((e) => <Post data={e} />);
    this.setState({ posts });
  };

 render() {
    const { posts } = this.state;
   console.log(posts);
   return (
      <div>
        <VisitHeader />
        <section className="blog-area section">
          <div className="container">
            <div className="row">
              { posts }
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }
};