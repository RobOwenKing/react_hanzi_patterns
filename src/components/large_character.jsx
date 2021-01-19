import React, { Component } from 'react';

class LargeCharacter extends Component {
  render() {
    return (
      <h2>{this.props.charData.character}</h2>
    );
  }
}

export default LargeCharacter;
