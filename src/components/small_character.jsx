import React, { Component } from 'react';

import { getPinyin } from '../helpers/data.js';
import { pinyinify } from '../helpers/pinyinify.js';

class SmallCharacter extends Component {
  handleClick = (event) => {
    this.props.clickHandler(this.props.char);
  };

  pinyin = () => {
    if (this.props.pinyin) {
      return pinyinify(this.props.pinyin);
    } else {
      return getPinyin(this.props.char);
    }
  };

  component() {
    if (this.props.showPinyin) {
      return (
        <ruby onClick={this.handleClick}>
          <rb className={this.props.classes}
              tabindex="0">{this.props.char}</rb>
          <rp>(</rp><rt>{this.pinyin()}</rt><rp>)</rp>
        </ruby>
      );
    } else {
      return (
        <span onClick={this.handleClick}
            className={this.props.classes}
            tabindex="0">{this.props.char}</span>
      );
    }
  };

  render() {
    return (
      <span className="small-character">
        {this.component()}
      </span>
    );
  };
}

export default SmallCharacter;
