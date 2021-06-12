import React, { Component } from 'react';

import { ordinalSuffix } from '../helpers/ordinal_suffix.js';

import SmallCharacter from './small_character.jsx';

class Frequency extends Component {
  frequency() {
    const freq = this.props.newCharData.frequency.frequency;
    if (freq) {
      return `${ordinalSuffix(freq)} most common`;
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
