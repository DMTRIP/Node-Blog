import React from 'react';

import VisitPage from '../pages/visit-page';
import CreatePostPage from '../pages/create-post-page';
import MyPostPage from '../pages/my-post-page';
import SinglePostPage from '../pages/single-post-page';
import HomePage from '../pages/home-page';
import ProfilePage from '../pages/profile-page';

import { authHelper } from '../helpers';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


const App = () => {
  return (
    <Router>
      <Switch>
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
        <Route path='/profile' component={ProfilePage} />
      </Switch>
    </Router>
  )
};

export default App;