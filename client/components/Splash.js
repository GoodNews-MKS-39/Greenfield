import React from 'react';

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  const now = new Date();
  return (
    <div className="splashpage_background">
      <div className="news_div-splashpage">
        <h1>Good News</h1>
        <div>
          <h3>{now.toDateString()}</h3>
          <button className='goodNews' onClick={this.props._changeMood}>Good News</button>
          <button className='badNews' onClick={this.props._changeMood}>Bad News</button>
        </div>
      </div>
    </div>);
  }

}
