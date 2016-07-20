import React from 'react';
// import Splash from './Splash.js'; ---------- removed landing PAGE
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
    // if (this.state.mood === null) { ---------- removed landing PAGE
    //   return (<Splash _changeMood={this._changeMood.bind(this)} />);---------- removed landing PAGE
    // } else {---------- removed landing PAGE
      return (<ArticleList mood={this.state.mood} />);
    // }---------- removed landing PAGE
  }

  _changeMood() {
    this.setState({mood: 'joy'});
  }

}
