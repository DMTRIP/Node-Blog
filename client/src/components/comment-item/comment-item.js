import React from 'react';

const CommentItem = ({ data }) => {

      return (
        <div className="commnets-area">

          <div className="comment">

            <div className="post-info">

              <div className="left-area">
                <a className="avatar" href="#"><img src={data.authorAvatar} alt="Profile Image" /></a>
              </div>

              <div className="middle-area">
                <a className="name" href="#"><b>{data.authorName}</b></a>
                <h6 className="date">{data.created}</h6>
              </div>

              <div className="right-area">
                <h5 className="reply-btn"><a href="#"><b>REPLY</b></a></h5>
              </div>

            </div>

            <p>{data.massage}</p>

          </div>

        </div>
      )
};

  export default CommentItem;