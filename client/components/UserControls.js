import React from 'react';

// this component allows the user to control which articles are displayed via date selection
export default class UserControls extends React.Component {
  handleButtonClick(mood) {
  	this.props.getArticles;
  	this.props.changeMood
  }

  render() {
    return (
      <div className='user-controls'>
        <button className='goodNews' onClick={this.handleButtonClick}>Good News</button>
        <button className='badNews' onClick={this.handleButtonClick}>Bad News</button>
      </div>
    )
  }
}
