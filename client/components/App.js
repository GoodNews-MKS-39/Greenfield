import React from 'react';
import Splash from './Splash.js';
import ArticleList from './ArticleList.js';

// this is the highest level component, toggles between rendering Splash & ArticleList
export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      // state variable to control what gets displayed. eg mood = null; (or joy)
      mood: null
    };
  }

  render() {
    if (this.state.mood === null) {
      return (<Splash _changeMood={this._changeMood.bind(this)} />);
    } else {
      return (<ArticleList mood={this.state.mood} />);
    }
  }

  _changeMood() {
    this.setState({mood: 'joy'});
  }

}
