import React, { Component, Fragment } from 'react';

import VisitHeader from '../visit-header';
import Post from '../post';
import Footer from '../footer';
import ErrorHandler from '../error-handler';
import LoginForm from '../login';

import BonaService from '../../services/bona-service';
const bonaService = new BonaService();

 class VisitPage extends Component{

  state = {
    login: null,
    sighUp: null,
    className: 'overlay overlay01 is-open',
    formClassName: '',
    term: 'some',
    err: false,
  };

   onLogin = () => {
     this.setState(
       { className: 'overlay overlay01 is-open',
              formClassName: '',
              sighUp: false,
              login: true
       });
   };

   onSignUp = () => {
     this.setState(
       { className: 'overlay overlay01 is-open',
         formClassName: '',
         sighUp: true,
         login: false
       });
   };

   disableOverlay = () => {
     this.setState({className: 'overlay overlay01'});
     this.setState({formClassName: 'disable'});
   };


  render() {
    const {  err, login, sighUp, className, formClassName } = this.state;
    const { history } = this.props;
    const error = err ? <ErrorHandler /> : null;


    const loginForm = login ?  <LoginForm classLogin={className}
                                          login={login} view='login'
                                          disableOverlay={this.disableOverlay}
                                          classDisable={formClassName}
                                          label='Login'
                                          history={history}/> : null;

    const sighUpFrom = sighUp ?  <LoginForm  login={login} view='signUp'
                                             classLogin={className}
                                             disableOverlay={this.disableOverlay}
                                             classDisable={formClassName}
                                             label='Sign Up'
                                             history={history}/> : null;
    return (

     <Fragment>
        <VisitHeader onLogin={this.onLogin} onSignUp={this.onSignUp}/>
       {loginForm}
       {sighUpFrom}
              <Post getPost={bonaService.postPage}  loadBtn={true} />
              { error }
        <Footer />
     </Fragment>
    )
  }
}
export default VisitPage;