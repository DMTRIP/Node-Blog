import React, { Component }  from 'react';
import Spinner from "../spinner";

import BonaService from '../../services/bona-service';

import './comment.css'
const bonaService = new BonaService();

export default class Comment extends Component{

  state = {
    pageData: null,
    commentAmt: 0,
    pageNum: 0,
    massage: '',
    err: false,
  };

   componentDidMount() {
     const { pageNum } = this.state;
      this.init(pageNum);
   }

  async init (pageNum) {
    const { postId } = this.props;
    const { pageData } = this.state;
    try {
      const { data } = await bonaService.getCommentPage(postId, pageNum);
      const comments = data.page;

      if(pageData) {
        this.setState(({ pageData }) => {
          const oldArr = [...pageData];
          const newArr = [...pageData, ...comments];

          return {
            pageData: newArr
          };
        });
      } else {
        this.setState({ pageData: comments });
        this.setState({ commentAmt: data.commentAmt });

      }

    } catch (e) {
      this.setState({ err: true })
    }

  };

  nextPage = (pageNum) => {

    this.setState(({ pageNum }) => {
      let newNum = pageNum;
      newNum++;
      return {
        pageNum: newNum
      }
    });
    console.log(this.state.pageNum + 1);
    this.init(this.state.pageNum + 1);
  };

  addComment = async (e) => {
    e.preventDefault();
    const { massage } = this.state;
    if(massage.length === 0) return;

    const {data: { name, avatar }} = await bonaService.getUser();
    const { data: { date }} = await bonaService.getDate();

    const comment = {
      authorName: name,
      authorAvatar: avatar,
      created: date,
      massage,
    };

    this.setState(({ pageData }) => {
      const newArr = [ comment, ...pageData];
      console.log(newArr);
      return {
        pageData: newArr
      }
    });

    const { postId } = this.props;
    bonaService.addComment(postId, massage);

  };

  onChange = (e) => {
    this.setState({ massage: e.target.value });
  };

  comment = (data) => {
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

  render() {
      const { pageData, err, commentAmt } = this.state;

    if(!pageData) return <Spinner />;
    const comment = pageData.map(e => this.comment(e));

    return (
      <section className="comment-section">
        <div className="container">
          <h4><b>POST COMMENT</b></h4>
          <div className="row">

            <div className="col-lg-8 col-md-12">
              <div className="comment-form">
                <form method="post" onSubmit={(e) => this.addComment(e)}>
                  <div className="row">

                    <div className="col-sm-12">
									<textarea
                    onChange={(e) => this.onChange(e)}
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
              <p className="more-comment-btn" onClick={this.nextPage} ><b>VIEW MORE COMMENTS</b></p>

            </div>

          </div>
        </div>
      </section>
    )
  }
};

