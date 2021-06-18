import React, { Component } from 'react';

import { getPinyin } from '../helpers/data.js';

class SmallCharacter extends Component {
  handleClick = (event) => {
    this.props.clickHandler(this.props.char);
  };

  component() {
    if (this.props.showPinyin) {
      return (
        <ruby onClick={this.handleClick}>
          <rb className="char-mid margin-l-r">{this.props.char}</rb>
          <rp>(</rp><rt>{getPinyin(this.props.char)}</rt><rp>)</rp>
        </ruby>
      );
    } else {
      return (
        <span onClick={this.handleClick} className="char-mid margin-l-r">{this.props.char}</span>
      );
    }
  };

  render() {
    return (
      <span className="small-character">
        {this.component()}
      </span>
    );
  }
}

export default SmallCharacter;
