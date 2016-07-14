// this component allows the user to control which articles are displayed
import React from 'react';

export default class UserControls extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: ''
    };
  }

  render() {
      return (
      <div className='user-controls'>
        <form onSubmit={function(e){ e.preventDefault() }}>
          <input
            type="text"
            name="startDate"
            placeholder="Start Date"
            value={this.state.startDate}
            onInput={this._handleStartDateInput.bind(this)}
          />
          <input
            type="text"
            name="endDate"
            placeholder="End Date"
            value={this.state.endDate}
            onInput={this._handleEndDateInput.bind(this)}
          />
        <button onClick={this.props._fetchByDate.bind(this, this.state.startDate, this.state.endDate)}> Search </button>
        </form>
      </div>
  )}

  _handleStartDateInput(e){
    this.setState({startDate: e.currentTarget.value});
  }

  _handleEndDateInput(e){
    this.setState({endDate: e.currentTarget.value});
  }

}
