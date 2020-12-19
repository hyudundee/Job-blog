import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {getReduxStore} from "../Config/firebase-redux";
import Login from '../Layout/LoginPage/LoginPage';

it('renders Login without crashing', () => {
  const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={getReduxStore()}>
        <Login />
      </Provider>,
      div
    );
    
});

