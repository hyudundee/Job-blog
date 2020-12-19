import React from 'react';
import ReactDOM from 'react-dom';
import NewArticle from '../Layout/NewArticle/NewArticle';

it('renders NewArticle without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NewArticle />, div);
});