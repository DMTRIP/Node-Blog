import React, {  Component } from 'react';

import './post-info.css'
import BonaService from "../../services/bona-service";
import Spinner from "../spinner";
const bonaService = new BonaService();
export default class PostInfo extends Component {

  state = {
    user: null,
    created: null,
  };

  componentDidMount() {
    this.init();
  };

  async init () {
    const { post } = this.props;
    const { author, created } = post;

    try {
      const { data } = await bonaService.getUserById(author);
      this.setState({ user: data });
      this.setState({ created });
    } catch (e) {
      this.setState({ err: true })
    }

  };


  render() {

    const { user, created } = this.state;

    if(!user) return <Spinner />;

    return (
      <div className="post-info">

        <div className="left-area">
          <a className="avatar" href="#"><img src={user.avatar} alt="Profile Image" /></a>
        </div>

        <div className="middle-area">
          <a className="name" href="#"><b>{user.name}</b></a>
          <h6 className="date">{created}</h6>
        </div>

      </div>
    )
  }
};

