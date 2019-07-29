import React, {  Component } from 'react';

import './post-info.css'
import BonaService from "../../services/bona-service";
const bonaService = new BonaService();
export default class PostInfo extends Component {

  state = {
    user: null
  };

  componentDidMount() {
    this.init();
  };

  async init () {
    try {
      const { data } = await bonaService.getUser();
      const post = await bonaService.getPost();
      console.log(post);
      this.setState({ user: data });
    } catch (e) {
      this.setState({ err: true })
    }

  };


  render() {
    return (
      <div className="post-info">

        <div className="left-area">
          <a className="avatar" href="#"><img src="images/avatar-1-120x120.jpg" alt="Profile Image" /></a>
        </div>

        <div className="middle-area">
          <a className="name" href="#"><b>Katy Liu</b></a>
          <h6 className="date">on Sep 29, 2017 at 9:48 am</h6>
        </div>

      </div>
    )
  }
};

