import React, { Component } from 'react';

import LargeCharacter from './large_character.jsx';

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

  render() {
    return (
      <div>
        <LargeCharacter style={FONTFAMILIES.heiti} charData={this.props.charData} />
        <LargeCharacter style={FONTFAMILIES.songti} charData={this.props.charData} />
        {this.props.charData.pinyin
            && <p>{this.props.charData.pinyin.join(', ')}</p>}
        {this.props.charData.definition && <p>{this.props.charData.definition}</p>}
        {this.props.charData.etymology && <p>{this.formattedEtymology()}</p>}
      </div>
    );
  }
}

export default CharacterDetails;
