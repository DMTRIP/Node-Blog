import React, { Component } from 'react';

import ErrorHandler from "../error-handler";
import BonaService from "../../services/bona-service";
const bonaService = new BonaService();

const withData = (View) => {
  return class extends Component {
    state = {
      data: null,
      err: false
    };

    componentDidMount() {
      this.postInit();
    }

    async postInit () {
      const { getPost } = this.props;

      try {
        const { data } = await bonaService.getPosts();
        console.log(data);
        this.setState({ data: data });
      } catch (e) {
        console.log(1);
        this.setState({ err: true })
      }

    };


    render() {
      const { data, err } = this.state;
      console.log(data);
      if (err) return <ErrorHandler />;
      return (
        <View {...this.props} data={data}/>
      )
    };
  };
};

export default withData;