import React from 'react';

// this component allows the user to control which articles are displayed via date selection
export default class UserControls extends React.Component {
  render() {
    return (
      <div className='user-controls'>
        <button onClick={this.props.getArticles}> Search </button>
      </div>
    )
  }

}
