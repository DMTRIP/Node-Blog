import React from 'react';

import Post from '../post';
import BonaService from '../../services/bona-service';
import './recommended-post.css'

const bonaService = new BonaService();


const RecommendedPost = () => {
  return (
    <section className="recomended-area section">
      <div className="container">
        <div className="row">

          <Post getPost={bonaService.getRecommendedPost} />

        </div>
      </div>
    </section>
  )
};

export default RecommendedPost;