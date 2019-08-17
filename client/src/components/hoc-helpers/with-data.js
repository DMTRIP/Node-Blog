import React, { Component } from 'react';

import ErrorHandler from "../error-handler";
import Spinner from '../spinner';

import BonaService from "../../services/bona-service";
const bonaService = new BonaService();

const withData = (View, getData) => {
  return class extends Component {
    state = {
      data: null,
      err: false,
    };

    componentDidMount() {
      this.postInit();
    }

    async postInit () {

      try {
        const { data } = await getData();
        console.log(data);
        this.setState({ data: data });
      } catch (e) {
        console.log(1);
        this.setState({ err: true})
      }

    };


    render() {
      const { data, err } = this.state;

      if(!data) return <Spinner />;

      if (err) return <ErrorHandler />;
      return (
        <View {...this.props} data={data}/>
      )
    };
  };
};

export default withData;