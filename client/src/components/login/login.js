import React, { Component, Fragment } from 'react';

import Recaptcha from 'react-recaptcha';

import BonaService from '../../services/bona-service';
import UserMassage from '../user-massage';
import Auth from '../helpers/auth-helper';

import './login.css';
const auth = new Auth();


const bonaService = new BonaService();

export default class Login extends Component {
  state = {
    name: null,
    email: null,
    password: null,
    invalidName: false,
    invalidEmail: false,
    invalidPassword: false,
    captcha: false,
    sighUpSuccess: false,
    sighUpFail: false,
    loginFail: false
  };

  onChange = (e, pattern, ivalidName) => {
    console.log(pattern.test(e.target.value));
    if(pattern.test(e.target.value)) {
      this.setState({
        [e.target.name]: e.target.value,
        [ivalidName]: false,
      })
    } else  {
      this.setState({
        [e.target.name]: '',
        [ivalidName]: true
      });
    }

    if(e.target.value === '') {
      this.setState({ [ivalidName]: false });
    };
  };


   submit = async (e) => {
     e.preventDefault();
     const { captcha, name, email, password } = this.state;
     const { view, history } = this.props;
     const data = {
       name,
       email,
       password
     };
     if (view === 'signUp') {
       if (captcha && name && email && password) {

         const res = await bonaService.createUser(data);
         if (res.status === 201) {
           this.setState({ sighUpSuccess: true });
         } else {
           this.setState({ sighUpFail: true });
         }
       }
     } else if (view === 'login') {
       if (captcha && email && password) {
         const res = await bonaService.login(data);
         console.log(res.data.token);
         if (res.status === 200) {
           auth.setJwt(res.data.token);
           auth.setId(res.data.id);
           // history.push('/');
         } else {
           this.setState({ loginFail: true });
         }
       }
     }
   };

  verifyCallback =  async (captcha) => {
    const res = await bonaService.captchaVereficate(captcha);
    if(res.status === 200) {
      this.setState({ captcha: true });
    }
  };

  render() {
    const { classLogin, disableOverlay, classDisable, label, view } = this.props;
    const { invalidName,  invalidEmail, invalidPassword,
            sighUpSuccess, sighUpFail, loginFail} = this.state;

    let className, classEmail, classPassword;

    className = invalidName ? 'invalid-input' : '';
    classEmail = invalidEmail ? 'invalid-input' : '';
    classPassword = invalidPassword ? 'invalid-input' : '';

    // validation pattern
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const namePattern = /^[\w'\-,.][^0-9_!¡?÷?¿\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,100})/;

    let input = null;
    if(view === 'login') {
      input = (
        <Fragment>

          <input className={className} name='email' placeholder="Email" type="text" required=""
                 onChange={(e) => this.onChange(e, emailPattern,'invalidEmail')} />

          <input className={classPassword} name='password' placeholder="Password" type="password" required=""
                 onChange={(e) => this.onChange(e, passwordPattern,'invalidPassword')} />

        </Fragment>
      )
    } else if (view === 'signUp') {
      input = (
        <Fragment>

          <input className={classEmail} name='email' placeholder="Email" type="email" required=""
                 onChange={(e) => this.onChange(e, emailPattern,'invalidEmail')} />

          <input className={className} name='name' placeholder="Username" type="text" required=""
                 onChange={(e) => this.onChange(e, namePattern,'invalidName')} />

          <input className={classPassword} name='password' placeholder="Password  'example: qqqqqQ1!' " type="password" required=""
                 onChange={(e) => this.onChange(e, passwordPattern,'invalidPassword')} />

        </Fragment>
      )
    }

const sighUp = sighUpSuccess ? <UserMassage type='success' label='user has been created' /> : null;
const sighUpErr = sighUpFail ? <UserMassage type='err' label='Something has gone wrong' /> : null;
const loginErr = loginFail ? <UserMassage type='err' label='wrong password or user name' /> : null;

    return (
      <Fragment>
        <div className={classLogin} onClick={disableOverlay}>  </div>

        <div className={classDisable}>
            <form onSubmit={this.submit} className='Login'>
              <h1>{label}</h1>
              {input}

             <Recaptcha
               sitekey='6LfgMqwUAAAAAMIS_TSYyxFq8Lf33f5cFgHNzg-e'
               render="explicit"
               verifyCallback={this.verifyCallback}
             />

              <button>Submit</button>

              {sighUp}
              {sighUpErr}
              {loginErr}

            </form>
          </div>
      </Fragment>
    )
  };
};
