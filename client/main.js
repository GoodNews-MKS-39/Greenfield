// React package that deals with DOM interactions
import ReactDOM from 'react-dom';

// React package for constructing components (and all non-DOM related actions)
import React from 'react';


// Import parent app component
import ArticleList from './components/ArticleList';

// Render that component to the DOM!
ReactDOM.render(<ArticleList />, document.getElementById('app'));
