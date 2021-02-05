import React, { Component } from 'react';

import Etymology from './etymology.jsx';
import LargeCharacter from './large_character.jsx';
import SmallCharacter from './small_character.jsx';

import { pinyinify } from '../helpers/pinyinify.js';
import { ordinalSuffix } from '../helpers/ordinal_suffix.js';

const FONTFAMILIES = {
  'heiti': "STHeiti, 华文黑体, 'Microsoft YaHei', 微软雅黑, SimHei, 黑体, sans-serif",
  'songti': "SimSun, 宋体, 'Zhongyi Songti', 中易宋体, serif"
};

class CharacterDetails extends Component {
  frequency() {
    const freqData = this.props.hanzi.getCharacterFrequency(this.props.charData.character);
    if (typeof freqData != 'string') {
      const position = freqData.number;
      return `${ordinalSuffix(position)} most common`;
    }
  };

  formattedDefinition() {
    return (
      this.props.charDefn.map((element) => {
        return (
            <p>
            <span className="bold">{pinyinify(element.pinyin)}</span>
            &nbsp;
            <span className="italics">{element.definition}</span>
            </p>
          )
      })
    )
  };

  etymologyType() {
    const type = this.props.charData.etymology.type;
    if (type === 'pictophonetic') {
      return 'Phonosemantic';
    } else if (type === 'ideographic') {
      return 'Ideographic';
    } else if (type === 'pictographic') {
      return 'Pictographic';
    } else {
      return 'Unknown';
    }
  };

  etymologyContents() {
    const etymology = this.props.charData.etymology;
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

  charactersWithComponent() {
    const chars = this.props.hanzi.getCharactersWithComponent(this.props.charData.character);
    // If no characters are found with the given component
    // the above function returns string "X not found"
    if (Array.isArray(chars)) {
      return chars.map((char) => {return (<SmallCharacter char={char} hanzi={this.props.hanzi} />)})
          .reduce((prev, curr) => [prev, ' ', curr]);
    } else {
      return (<p>None found</p>)
    }
  }

  render() {
    return (
      <div>
        <LargeCharacter style={FONTFAMILIES.heiti} charData={this.props.charData} />
        <LargeCharacter style={FONTFAMILIES.songti} charData={this.props.charData} />

        <p>{this.frequency()}</p>

        {this.props.charDefn && this.formattedDefinition()}

        <Etymology type={this.etymologyType()} contents={this.etymologyContents()} hanzi={this.props.hanzi} />

        <h3>Characters which contain {this.props.charData.character}</h3>
        {this.charactersWithComponent()}
      </div>
    );
  }
}

export default CharacterDetails;
