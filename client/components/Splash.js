// this is the 'landing page' component
import React from 'react';
import ReactDOM from 'react-dom'; 

export default class Splash extends React.Component{
  constructor(props) {
    super(props);
    this.pros: {
    	
    }

   
  }

  render(){

  	const now = new Date(); 
  	return (
  		<div>
  			<h1>Good News!!!</h1>
  			<div>
  				<h3>Today's Stories</h3>
  				Current time: {now.toTimeString()}
  				<button className='moodSetter'>Set Your Mood!</button>
  			</div>
  		</div>); 
  }


 ReactDOM.render() {
    // welcome people to our site, and have button to see articles and set mood = cheerful;
    // login form
    <Splash />, document.getElementById('app');
  }
}