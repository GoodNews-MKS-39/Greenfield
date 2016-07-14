// this is the 'landing page' component
import React from 'react';

export default class Splash extends React.Component{
  constructor(props) {
    super(props);
    // this.props: {

    // }
  }

  render(){
  const now = new Date();
  return (
    <div className="splashpage_background">
      <div className="news_div-splashpage">
      <h1>Good News</h1>
        <div>
          <h3>{now.toDateString()}</h3>
          <button className='moodSetter' onClick={this.props._changeMood.bind(this)}>Set Your Mood!</button>
        </div>
      </div>
    </div>);
  }
}
