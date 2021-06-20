import React, { Component } from 'react';

import { pinyinify } from '../helpers/pinyinify.js';

class WordCharacter extends Component {
  handleClick = (event) => {
    this.props.clickHandler(this.props.char);
  };

  component() {
    if (this.props.showPinyin) {
      return (
        <ruby onClick={this.handleClick}>
          <rb className="char-mid">{this.props.char}</rb>
          <rp>(</rp><rt>{pinyinify(this.props.pinyin)}</rt><rp>)</rp>
        </ruby>
      );
    } else {
      return (
        <span onClick={this.handleClick} className="char-mid">{this.props.char}</span>
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

export default WordCharacter;
