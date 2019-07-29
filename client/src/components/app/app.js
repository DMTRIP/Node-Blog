import React, { Component } from 'react';

import VisitPage from '../pages/visit-page';
import CreatePostPage from '../pages/create-post-page';
import MyPostPage from '../pages/my-post-page';
import SinglePostPage from '../pages/single-post-page';

import {BrowserRouter as Router, Route} from 'react-router-dom';


export default class App extends  Component{

  render() {
    return (
      <Router>
        <Route path='/' render={() => <h2> Welcome to Home page </h2>} exact/>
        <Route path='/create-post' component={CreatePostPage}/>
        <Route path='/visit' component={VisitPage}/>
        <Route path='/my-post' component={MyPostPage}/>
        <Route path='/single-post/:id'
               render={({match}) => {
                const { id } = match.params;
                return <SinglePostPage postId={id} />
               }}/>
      </Router>
    )
  }
}