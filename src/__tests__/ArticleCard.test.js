import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import ArticleCard from '../Component/ArticleCard/ArticleCard';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const article= {
      title: 'test title',
      content: 'test content',
      createDate: new Date(),
      lastModified: new Date(),
      featureImage: '',
      createUserID: 'test id',
      author: 'test author',
      jobtype: 'test jobtype',
      company: 'test company'

  }
    ReactDOM.render(
      <Router >
        <ArticleCard 
          data={article}/>
      </Router>,
      div);
  });