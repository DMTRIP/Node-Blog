import React, { Component } from 'react';

import VisitPage from '../pages/visit-page';
import CreatePostPage from '../pages/create-post-page';
import MyPostPage from '../pages/my-post-page';
import SinglePostPage from '../pages/single-post-page';


export default class App extends  Component{

  render() {
    return (
      <SinglePostPage />
    )
  }
}