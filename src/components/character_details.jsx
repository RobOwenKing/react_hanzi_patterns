import React, { Component } from 'react';

import LargeCharacter from './large_character.jsx';

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
            <p>{pinyinify(element.pinyin)} - {element.definition}</p>
          )
      })
    )
  }

  render() {
    return (
      <div>
        <LargeCharacter style={FONTFAMILIES.heiti} charData={this.props.charData} />
        <LargeCharacter style={FONTFAMILIES.songti} charData={this.props.charData} />
        {this.props.charDefn && this.formattedDefinition()}
        {this.props.charData.etymology && <p>{this.formattedEtymology()}</p>}
      </div>
    );
  }
}

export default CharacterDetails;
