import React from 'react';

import Post from '../post';
import { loadDataPage, withData } from '../hoc-helpers';
import { withRouter } from 'react-router-dom';
import BonaService from '../../services/bona-service';

const bonaService = new BonaService();

const PostPage = withRouter(loadDataPage(Post, bonaService.postPage));

const MyPostPage = withRouter(loadDataPage(Post, bonaService.myPostPage));

const RecommendedPostList = withRouter(withData(Post, bonaService.getRecommendedPost));

export {
  PostPage,
  MyPostPage,
  RecommendedPostList
}
