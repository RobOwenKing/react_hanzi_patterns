import React, { Component } from 'react';

class SmallCharacter extends Component {
  pinyin() {
    const pinyin = this.props.hanzi.getPinyin(this.props.char);
    return pinyin ? pinyin.join(', ') : '?';
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
