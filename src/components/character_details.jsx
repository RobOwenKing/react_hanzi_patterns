import React, { Component } from 'react';

import LargeCharacter from './large_character.jsx';
import SmallCharacter from './small_character.jsx';

import { pinyinify } from '../helpers/pinyinify.js';

const FONTFAMILIES = {
  'heiti': "STHeiti, 华文黑体, 'Microsoft YaHei', 微软雅黑, SimHei, 黑体, sans-serif",
  'songti': "SimSun, 宋体, 'Zhongyi Songti', 中易宋体, serif"
};

class CharacterDetails extends Component {
  formattedEtymology() {
    const etymology = this.props.charData.etymology;
    if (etymology.type !== "pictophonetic") {
      return `${etymology.type}: ${etymology.hint}`;
    } else {
      return `${etymology.phonetic} (phonetic) + ${etymology.semantic} (semantic)`;
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
  }

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

        {this.props.charDefn && this.formattedDefinition()}

        <h3>Character Etymology</h3>
        {this.props.charData.etymology && <p>{this.formattedEtymology()}</p>}

        <h3>Characters which contain {this.props.charData.character}</h3>
        {this.charactersWithComponent()}
      </div>
    );
  }
}

export default CharacterDetails;
