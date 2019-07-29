import React, { Component, Fragment } from 'react';

import VisitHeader from '../visit-header';
import Post from '../post';
import Footer from '../footer';
import ErrorHandler from '../error-handler';


import BonaService from '../../services/bona-service';
const bonaService = new BonaService();

 class VisitPage extends Component{

  state = {
    term: 'some',
    err: false
  };

  render() {
    const {  err } = this.state;
    const error = err ? <ErrorHandler /> : null;

    return (
     <Fragment>
        <VisitHeader />
              <Post getPost={bonaService.getPosts} />
              { error }
        <Footer />
     </Fragment>
    )
  }
}
export default VisitPage;