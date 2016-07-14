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
    <div>
      <h1>Good News!!!</h1>
      <div>
        <h3>Today's Stories</h3>
        Current time: {now.toTimeString()}
        <button className='moodSetter' onClick={this.props._changeMood.bind(this)}>It's great to be alive!</button>
      </div>
    </div>);
  }

}
