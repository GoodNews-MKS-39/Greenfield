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
        <button className='goodNews' onClick={this.handleButtonClick.bind(this, "good")}>Good News</button>
        <button className='badNews' onClick={this.handleButtonClick.bind(this, "bad")}>Bad News</button>
      </div>
    )
  }
}
