import React, { Component }  from 'react';
import { connect } from 'react-redux';
import {  compose } from 'redux';
import { withBonaService } from '../hoc-helpers';
import { fetchComments, incrementCommnetsPageCount, nextPage,
         addComment, onChangeMassage } from '../../actions';

import Spinner from '../spinner';
import ErrorHandler from '../error-handler';
import CommentItem from '../comment-item';

import './comment.css'

const Comment = (props) => {
  const { nextPage, incrementPage, fetchComments, postId,
    massage, pageCount, commentAmt, addComment, onChangeMassage, comment } = props;

  return (
    <section className="comment-section">
      <div className="container">
        <h4><b>POST COMMENT</b></h4>
        <div className="row">

          <div className="col-lg-8 col-md-12">
            <div className="comment-form">
              <form method="post" onSubmit={(e) => addComment(e, massage, postId)}>
                <div className="row">

                  <div className="col-sm-12">
									<textarea
                    onChange={(e) => onChangeMassage(e.target.value)}
                    name="contact-form-message" rows="2" className="text-area-messge form-control"
                    placeholder="Enter your comment" aria-required="true" aria-invalid="false"> </textarea>
                  </div>
                  <div className="col-sm-12">
                    <button className="submit-btn" type="submit" id="form-submit"><b>POST COMMENT</b></button>
                  </div>

                </div>
              </form>
            </div>

            <h4><b>COMMENTS({commentAmt})</b></h4>

            {comment}
            <p className="more-comment-btn"
               onClick={() => nextPage(incrementPage, fetchComments, postId, pageCount)}
            ><b>VIEW MORE COMMENTS</b></p>

          </div>

        </div>
      </div>
    </section>
  )
};

 class CommentListContainer extends Component{

 componentDidMount() {
      const { fetchComments, postId, pageCount } = this.props;
      fetchComments(postId, pageCount);
   }

  render() {
      const { comments, err } = this.props;

      if(!comments) return <Spinner />;
      if(err) return <ErrorHandler />;

      const comment = comments.map(e => <CommentItem data={e} />);

      return <Comment {...this.props} comment={comment}/>;

  }
};

const mapStateToProps = ({commentList: { comments, loading, err, pageCount, commentAmt, massage }}) => {
  return { comments, loading, err, pageCount, commentAmt, massage };
};

const mapDispatchToProps = (dispatch, { bonaService }) => {
  return {
    fetchComments: fetchComments(bonaService, dispatch),
    incrementPage: () => dispatch(incrementCommnetsPageCount()),
    nextPage:  nextPage(dispatch),
    addComment: addComment(bonaService, dispatch),
    onChangeMassage: (msg) => dispatch(onChangeMassage(msg))
  }
};


export default compose(
  withBonaService(),
  connect(mapStateToProps,mapDispatchToProps)
)(CommentListContainer);