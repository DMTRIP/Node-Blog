import React  from 'react';

import './comment.css'

const Comment = () => {
  return (
    <section className="comment-section">
      <div className="container">
        <h4><b>POST COMMENT</b></h4>
        <div className="row">

          <div className="col-lg-8 col-md-12">
            <div className="comment-form">
              <form method="post">
                <div className="row">

                  <div className="col-sm-6">
                    <input type="text" aria-required="true" name="contact-form-name" className="form-control"
                           placeholder="Enter your name" aria-invalid="true" required />
                  </div>
                  <div className="col-sm-6">
                    <input type="email" aria-required="true" name="contact-form-email" className="form-control"
                           placeholder="Enter your email" aria-invalid="true" required />
                  </div>

                  <div className="col-sm-12">
									<textarea name="contact-form-message" rows="2" className="text-area-messge form-control"
                            placeholder="Enter your comment" aria-required="true" aria-invalid="false"> </textarea>
                  </div>
                  <div className="col-sm-12">
                    <button className="submit-btn" type="submit" id="form-submit"><b>POST COMMENT</b></button>
                  </div>

                </div>
              </form>
            </div>

            <h4><b>COMMENTS(12)</b></h4>

            <div className="commnets-area">

              <div className="comment">

                <div className="post-info">

                  <div className="left-area">
                    <a className="avatar" href="#"><img src="images/avatar-1-120x120.jpg" alt="Profile Image" /></a>
                  </div>

                  <div className="middle-area">
                    <a className="name" href="#"><b>Katy Liu</b></a>
                    <h6 className="date">on Sep 29, 2017 at 9:48 am</h6>
                  </div>

                  <div className="right-area">
                    <h5 className="reply-btn"><a href="#"><b>REPLY</b></a></h5>
                  </div>

                </div>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur
                  Ut enim ad minim veniam</p>

              </div>

              <div className="comment">
                <h5 className="reply-for">Reply for <a href="#"><b>Katy Lui</b></a></h5>

                <div className="post-info">

                  <div className="left-area">
                    <a className="avatar" href="#"><img src="images/avatar-1-120x120.jpg" alt="Profile Image" /></a>
                  </div>

                  <div className="middle-area">
                    <a className="name" href="#"><b>Katy Liu</b></a>
                    <h6 className="date">on Sep 29, 2017 at 9:48 am</h6>
                  </div>

                  <div className="right-area">
                    <h5 className="reply-btn"><a href="#"><b>REPLY</b></a></h5>
                  </div>

                </div>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur
                  Ut enim ad minim veniam</p>

              </div>

            </div>

            <div className="commnets-area ">

              <div className="comment">

                <div className="post-info">

                  <div className="left-area">
                    <a className="avatar" href="#"><img src="images/avatar-1-120x120.jpg" alt="Profile Image" /></a>
                  </div>

                  <div className="middle-area">
                    <a className="name" href="#"><b>Katy Liu</b></a>
                    <h6 className="date">on Sep 29, 2017 at 9:48 am</h6>
                  </div>

                  <div className="right-area">
                    <h5 className="reply-btn"><a href="#"><b>REPLY</b></a></h5>
                  </div>

                </div>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur
                  Ut enim ad minim veniam</p>

              </div>

            </div>

            <a className="more-comment-btn" href="#"><b>VIEW MORE COMMENTS</b></a>

          </div>

        </div>
      </div>
    </section>
  )
};

export default Comment;