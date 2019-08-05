import React from 'react';

const PostItem = (props) => {
  const { postData, singlePostRoute, onLike } = props;
  const { data, like } = postData;

  let classLike = '';
  console.log(like);
  if(like) {
    console.log(2);
    classLike = 'like';
  };

  return (
    <div key={data._id} className="col-lg-4 col-md-6">
      <div className="card h-100">
        <div className="single-post post-style-1">

          <div onClick={() => singlePostRoute(data._id)} className="blog-image"><img src={data.preview} alt="Blog Image" /></div>

          <a className="avatar" href="#"><img src={data.authorAvatar} alt="Profile Image" /></a>

          <div className="blog-info">

            <h4 onClick={() => singlePostRoute(data._id)}  className="title"><a href="#"><b>{data.title}</b></a></h4>

            <ul className="post-footer">
              <li ><span onClick={() => onLike(data._id)}
                      className={classLike + ' like-span'}
                      ><i className="fas fa-heart"></i>{data.likes.length}</span></li>
              <li><a href="#"><i className="fas fa-comment"></i>{data.comments.length}</a></li>
              <li><a href="#"><i className="fas fa-eye"></i>{data.views}</a></li>
            </ul>

          </div>
        </div>
      </div>
    </div>
  )
};

export default PostItem;