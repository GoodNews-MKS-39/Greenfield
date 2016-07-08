// this is the highest level component
import React from 'react';
import Splash from './Splash';
import ArticleList from './ArticleList';

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      mood: null
    };
    // state variable to control what gets displayed. eg mood = null; (or cheerful)
  }

  changeMood() {
    this.setState({mood: 'joy'});
  }

  render() {
        if (this.state.mood === null) {
          return (<Splash changeMood={this.changeMood.bind(this)} />);
        } else {
          return (<ArticleList />);
        }
  }
}
