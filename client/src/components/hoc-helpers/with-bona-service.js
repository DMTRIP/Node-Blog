import React from 'react';
import { BonaServiceConsumer } from '../bona-service-context';

const withBonaService = () => (Wrapped) => {
  return (props) => {
    return (
      <BonaServiceConsumer>
        {
          (bonaService) => {
            return (<Wrapped {...props} bonaService={bonaService}/>);
          }
        }
      </BonaServiceConsumer>
    )
  }
};

  export default withBonaService;