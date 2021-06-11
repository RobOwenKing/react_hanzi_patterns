import React, { Component } from 'react';

import SmallCharacter from './small_character.jsx';

class Frequency extends Component {
  frequency() {
    const freq = this.props.newCharData.frequency;
    if (freq) {
      return `${freq} most common`;
    } else {
      return `No frequency data found`;
    }
  };

  render() {
    return (
      <div>
        <p>{this.frequency()}</p>
      </div>
    );
  }
}

export default Frequency;
