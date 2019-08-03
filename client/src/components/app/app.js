import React, { Component } from 'react';

import VisitPage from '../pages/visit-page';
import CreatePostPage from '../pages/create-post-page';
import MyPostPage from '../pages/my-post-page';
import SinglePostPage from '../pages/single-post-page';
import HomePage from '../pages/home-page';

import { withData } from '../hoc-helpers';
import BonaService from '../../services/bona-service';
import Login from '../login';
import { authHelper } from '../helpers';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import Redirect from "react-router-dom/es/Redirect";


export default class App extends  Component{



  render() {

    // const PrivateRoute = ({ component: Component, match, ...rest }) => (
    //   <Route {...rest} render={(props) => (
    //     authHelper.isAuthenticated() === true
    //       ? <Component {...props} />
    //       : <Redirect to='/login' />
    //   )} />
    // );

    return (
      <Router>
        <Route path='/visit'
               render={({ history }) => {
                if(authHelper.getJwt()) {
                  history.push('/');
                } else {
                  return <VisitPage />
                }
               }}/>
          <Route path='/create-post' component={CreatePostPage}/>
          <Route path='/my-post' component={MyPostPage}/>
          <Route path='/single-post/:id'
                 render={({match}) => {
          const { id } = match.params;
          let isLogin = false;
          if(authHelper.getJwt()) isLogin = true;
          return <SinglePostPage postId={id} isLogin={isLogin} />
          }}/>
          <Route path='/' component={HomePage} exact/>
    </Router>
    )
  }
}