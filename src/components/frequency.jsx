import React, { Component } from 'react';

import { ordinalSuffix } from '../helpers/ordinal_suffix.js';

import SmallCharacter from './small_character.jsx';

class Frequency extends Component {
  formatFrequency() {
    const freq = this.props.newCharData.frequency.frequency;
    if (freq) {
      return `${ordinalSuffix(freq)} most common`;
    } else {
      return `No frequency data found`;
    }
  };

  formatNeighbours() {
    const neighbours = this.props.newCharData.frequency.neighbours;
    return neighbours.map((char, index) =>
          {return (<SmallCharacter key={index} char={char} clickHandler={this.props.clickHandler} showPinyin={this.props.showPinyin} />)}
        );
  };

  render() {
    return (
      <div>
        <div>{this.formatFrequency()}</div>
        <div>{this.formatNeighbours()}</div>
      </div>
    );
  }
}

export default Frequency;
