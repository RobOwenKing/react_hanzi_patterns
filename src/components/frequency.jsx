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
    const dots = this.props.newCharData.frequency.dots;
    const neighbours = this.props.newCharData.frequency.neighbours;
    return (
      <div>
        {dots[0] && "⋯⋯"}
        {neighbours.map((char, index) =>
            {return (<SmallCharacter key={index} char={char} clickHandler={this.props.clickHandler} showPinyin={this.props.showPinyin} />)}
          )}
        {dots[1] && "⋯⋯"}
      </div>
    );
  };

  render() {
    return (
      <div>
        <h3>Frequency</h3>
        <div>{this.formatFrequency()}</div>
        <div>{this.formatNeighbours()}</div>
      </div>
    );
  }
}

export default Frequency;
