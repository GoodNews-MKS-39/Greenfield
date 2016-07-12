// this is the 'landing page' component
import React from 'react';
import ReactDOM from 'react-dom';

export default class Splash extends React.Component{
  constructor(props) {
    super(props);
    // this.props: {

    // }
  }

  _onChangeHandler(e) {
    var self = this;
    this.setState({value: e.target.value}, function(){
      // Makes sure that the state has been set at this stage
      self.props.changeMood(self.state.value);
    });
  }

  render(){

  const now = new Date();
  return (
    <div>
      <h1>Good News!!!</h1>
      <div>
        <h3>Todays Stories</h3>
        Current time: {now.toTimeString()}
        // <button className='moodSetter' onClick={this.props.changeMood.bind(this)}>Set Your Mood!</button>
        <select className='moodSetter' onChange={this._onChangeHandler} value={this.state.value}>
            <option value="joy">"joy"</option>
            <option value="sadness">"sadness"</option>
            <option value="anger">"anger"</option>
        </select>
      </div>
    </div>);
  }


//  ReactDOM.render() {
//     // welcome people to our site, and have button to see articles and set mood = cheerful;
//     // login form
//     <Splash />, document.getElementById('app');
//   }
}
