import React, { Component } from 'react';

import { ordinalSuffix } from '../helpers/ordinal_suffix.js';

import SmallCharacter from './small_character.jsx';

class Frequency extends Component {
  formatNeighbours() {
    const dots = this.props.charData.frequency.dots;
    const neighbours = this.props.charData.frequency.neighbours;
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

  formatFrequency() {
    const freq = this.props.charData.frequency;
    if (freq) {
      return (
        <div>
          <div>{ordinalSuffix(freq.frequency)} most common</div>
          {this.formatNeighbours()}
        </div>
      );
    } else {
      return `No frequency data found`;
    }
  };

  render() {
    return (
      <div>
        <h3>Frequency</h3>
        {this.formatFrequency()}
      </div>
    );
  }
}

export default Frequency;
