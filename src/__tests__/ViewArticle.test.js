import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import ViewArticle from '../Layout/ViewArticle/ViewArticle';

it('renders ViewArticle without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Router >
            <ViewArticle />
        </Router>,
        div
    );
});