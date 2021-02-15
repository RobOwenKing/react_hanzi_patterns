import React, { Component } from 'react';

import SmallCharacter from './small_character.jsx';

import { pinyinify } from '../helpers/pinyinify.js';

class Etymology extends Component {
  pinyin(char) {
    const pinyin = this.props.hanzi.getPinyin(char);
    if (!pinyin) {
      return '?';
    } else {
      const uniques = Array.from(new Set(pinyin));
      return uniques.map((element) => pinyinify(element)).join(', ');
    }
  }

  formattedContents() {
    const contents = this.props.contents;
    if (Array.isArray(contents)) {
      return (
        <div>
          <div>
            <SmallCharacter char={contents[0]} hanzi={this.props.hanzi} clickHandler={this.props.clickHandler} /> ({contents[1]}) +
            <SmallCharacter char={contents[2]} hanzi={this.props.hanzi} clickHandler={this.props.clickHandler} /> ({this.pinyin(contents[2])})
          </div>
          NB: The pronunciations given are from modern Mandarin, not those at the time the character was created.
        </div>
      );
    } else {
      return this.props.contents;
    }
  };

  render() {
    return (
      <div>
        <h3>Etymology: {this.props.type}</h3>
        {this.formattedContents()}
      </div>
    );
  }
}

export default Etymology;
