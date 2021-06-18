import React, { Component } from 'react';

import { formatDefinition } from '../helpers/format_definition.js';

import SmallCharacter from './small_character.jsx';
import WordCharacter from './word_character.jsx';

class AppearsIn extends Component {
  charsWithComponent() {
    const chars = this.props.charData.appearsIn.chars;
    if (chars) {
      return chars.map((char, index) => {return (<SmallCharacter key={index} char={char} clickHandler={this.props.clickHandler} showPinyin={this.props.showPinyin} />)})
          .reduce((prev, curr) => [prev, ' ', curr]);
    } else {
      return (<p>None found</p>);
    }
  };

  wordToCharacters(word, pinyin) {
    const pinyins = pinyin.split(' ')
    return [...word].map((char, index) => {
        return (
          <WordCharacter key={index} char={char}
              clickHandler={this.props.clickHandler}
              showPinyin={this.props.showPinyin} pinyin={pinyins[index]} />
        )})
        .reduce((prev, curr) => [prev, '', curr]);
  };

  wordsWithComponent() {
    const words = this.props.charData.appearsIn.words;
    if (words?.length) {
      return words.map((word, index) => {
          return (
            <div>
              <span className="margin-l-r">{this.wordToCharacters(word.simplified, word.pinyin)}</span>
              <span className="italics grey-text">{formatDefinition(word.definition)}</span>
            </div>
          )})
          .reduce((prev, curr) => [prev, ' ', curr]);
    } else {
      return (<p>None found</p>);
    }
  };

  render() {
    return (
      <div>
        <h3>Characters which contain {this.props.charData.char}</h3>
        {this.charsWithComponent()}
        <h3>Words/expressions which contain {this.props.charData.char}</h3>
        {this.wordsWithComponent()}
      </div>
    );
  }
}

export default AppearsIn;
