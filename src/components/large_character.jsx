import React, { Component } from 'react';

class LargeCharacter extends Component {
  render() {
    return (
      <span class="char-large">{this.props.charData.character}</span>
    );
  }
}

export default LargeCharacter;
