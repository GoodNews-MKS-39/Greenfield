//<DropdownButton /> component
import React from 'react';
var Alert = require('react-bootstrap').Alert;

export default class DropdownButton extends React.Component{
  constructor(props) {
    super(props);
  }

  const BUTTONS = ['Good News', 'Sad News', 'Angry News', 'Scary News', 'Disgusting News'];

  function renderDropdownButton(title, i) {
    return (
      <DropdownButton bsStyle={title.toLowerCase()} title={title} key={i} id={`dropdown-basic-${i}`}>
        <MenuItem eventKey="1" active>Good News</MenuItem>
        <MenuItem eventKey="2">Sad News</MenuItem>
        <MenuItem eventKey="3">Angry News</MenuItem>
        <MenuItem eventKey="4">Scary News</MenuItem>
        <MenuItem eventKey="5">Disgusting News</MenuItem>
      </DropdownButton>
    );
  }

  const buttonsInstance = (
    <ButtonToolbar>{BUTTONS.map(renderDropdownButton)}</ButtonToolbar>
  );

  ReactDOM.render(buttonsInstance, mountNode)
}

// hoping to add dropdown button to splash page


//ReactDOM.render(buttonsInstance, mountNode);


