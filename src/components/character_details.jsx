import React, { Component } from 'react';

// All used in: render()
import AppearsIn from './appears_in.jsx';
import Etymology from './etymology.jsx';
import Frequency from './frequency.jsx';
import LargeCharacter from './large_character.jsx';
import Pronunciation from './pronunciation.jsx';

// Values for CSS font-family of different <LargeCharacter />s
const FONTFAMILIES = {
  'heiti': "STHeiti, 华文黑体, 'Microsoft YaHei', 微软雅黑, SimHei, 黑体, sans-serif",
  'songti': "SimSun, 宋体, 'Zhongyi Songti', 中易宋体, serif"
};

/*
  Returns: <CharacterDetails />
  Props: charData     - Object
         clickHandler - Function
         showPinyin   - Boolean
         showMore     - Function
  Used in: <App /> from ../App.js
*/
class CharacterDetails extends Component {
  render() {
    return (
      <div>
        <LargeCharacter style={FONTFAMILIES.heiti} char={this.props.charData.char} />
        <LargeCharacter style={FONTFAMILIES.songti} char={this.props.charData.char} />

        <Pronunciation charData={this.props.charData}
            clickHandler={this.props.clickHandler}
            showPinyin={this.props.showPinyin} />

        <Frequency charData={this.props.charData}
            clickHandler={this.props.clickHandler}
            showPinyin={this.props.showPinyin} />

        <Etymology charData={this.props.charData}
            clickHandler={this.props.clickHandler}
            showPinyin={this.props.showPinyin}
            showMore={this.props.showMore} />

        <AppearsIn charData={this.props.charData}
            clickHandler={this.props.clickHandler}
            showPinyin={this.props.showPinyin}
            showMore={this.props.showMore} />
      </div>
    );
  }
}

export default CharacterDetails;
