import React, { Component } from 'react';

class LargeCharacter extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.charData.character}</h2>
      </div>
    );
  }
}

export default LargeCharacter;
