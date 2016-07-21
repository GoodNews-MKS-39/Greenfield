import React from 'react';

// this component allows the user to control which articles are displayed via date selection
export default class UserControls extends React.Component {
  handleButtonClick(mood) {
  	this.props.getArticles;
  	this.props.changeMood.call(this, mood)
  }

  render() {
    return (
      <div className='user-controls'>
        <button className='pure-button pure-button-primary goodNews' onClick={() => {
          document.title = "Good News"
          this.handleButtonClick.bind(this, "good")
        }}>Good News</button>
        <button className='pure-button pure-button-primary badNews' onClick={() => {
          document.title = "Bad News"
          this.handleButtonClick.bind(this, "bad")
        }}>Bad News</button>
      </div>
    )
  }
}
