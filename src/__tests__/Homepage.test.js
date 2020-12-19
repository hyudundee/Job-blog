import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../Layout/Homepage/Main/Main';
import Heading from '../Layout/Homepage/Heading/Heading';
import Footer from '../Layout/Homepage/Footer/Footer';
import {Provider} from 'react-redux';
import {getReduxStore} from "../Config/firebase-redux";

it('renders Homepage Main without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Main />, div);
});

it('renders Homepage Heading without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={getReduxStore()}>
          <Heading />
        </Provider>,
        div
      );
});


it('renders Homepage Footer without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Footer />, div);
});