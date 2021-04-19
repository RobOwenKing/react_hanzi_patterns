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

  etymologyType() {
    if (!this.props.newCharData.etymology) { return ''; }

    const type = this.props.newCharData.etymology.type;
    if (type === 'pictophonetic') {
      return 'Etymology: Phonosemantic';
    } else if (type === 'ideographic') {
      return 'Etymology: Ideographic';
    } else if (type === 'pictographic') {
      return 'Etymology: Pictographic';
    } else {
      return '';
    }
  };

  etymologyContents() {
    if (!this.props.newCharData.etymology) { return `No data found`; }

    const etymology = this.props.newCharData.etymology;
    if (etymology.type === 'pictophonetic') {
      return [
          etymology.semantic,
          etymology.hint,
          etymology.phonetic
      ];
    } else if (etymology.type === 'ideographic') {
      return etymology.hint;
    } else if (etymology.type === 'pictographic') {
      return etymology.hint;
    } else {
      return '';
    }
  };

  formattedContents() {
    const contents = this.etymologyContents();
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
      return contents;
    }
  };

  render() {
    return (
      <div>
        <h3>{this.etymologyType()}</h3>
        {this.formattedContents()}
      </div>
    );
  }
}

export default Etymology;
