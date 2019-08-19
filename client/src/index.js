import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BonaServiceProvider } from './components/bona-service-context';
import ErrBoundary from './components/err-boundary';
import App from './components/app';

import BonaService from './services/bona-service';

import store from './store';

const bonaService = new BonaService();


ReactDOM.render(
  <Provider store={store}>
    <ErrBoundary>
      <BonaServiceProvider value={bonaService}>
        <App />
      </BonaServiceProvider>
    </ErrBoundary>
  </Provider>
  , document.getElementById('root'));
