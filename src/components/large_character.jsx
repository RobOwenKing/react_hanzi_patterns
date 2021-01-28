import React, { Component } from 'react';

class LargeCharacter extends Component {
  render() {
    return (
      <span className="char-large" style={{fontFamily: this.props.style}}>{this.props.charData.character}</span>
    );
  }
}

export default LargeCharacter;
