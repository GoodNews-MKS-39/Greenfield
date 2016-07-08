// this is the highest level component
import React from 'react';

export default class App extends React.Component{
  constructor(props) {
    super(props);

    // state variable to control what gets displayed. eg mood = null; (or cheerful)
  }

  changeMood() {
    // function to change the state variable mood
  }

  render() {
    // splash compoment will show by default when mood = null
    
    // UserControls and ArticleList will show when mood = Something
  }
}