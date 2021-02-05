import React, { Component } from 'react';

import { pinyinify } from '../helpers/pinyinify.js';

class SmallCharacter extends Component {
  pinyin() {
    const pinyin = this.props.hanzi.getPinyin(this.props.char);
    if (!pinyin) {
      return '?';
    } else {
      const uniques = Array.from(new Set(pinyin));
      return uniques.map((element) => pinyinify(element)).join(', ');
    }
  }

  render() {
    return (
      <ruby>
        <rb>{this.props.char}</rb>
        <rp>(</rp><rt>{this.pinyin()}</rt><rp>)</rp>
      </ruby>
    );
  }
}

export default SmallCharacter;
