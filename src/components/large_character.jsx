import React, { Component } from 'react';

/*
  Returns: <LargeCharacter />
  Props:   char  - String, a single character
           style - String, a CSS font-family definition
  Used in: <CharacterDetails /> from ./character_details.jsx
*/
class LargeCharacter extends Component {
  render() {
    return (
      <span className="char-large" style={{fontFamily: this.props.style}}>{this.props.char}</span>
    );
  }
}

export default LargeCharacter;
