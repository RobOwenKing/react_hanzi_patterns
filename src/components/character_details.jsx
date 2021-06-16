import React, { Component } from 'react';

import AppearsIn from './appears_in.jsx';
import Etymology from './etymology.jsx';
import Frequency from './frequency.jsx';
import LargeCharacter from './large_character.jsx';
import Pronunciation from './pronunciation.jsx';

const FONTFAMILIES = {
  'heiti': "STHeiti, 华文黑体, 'Microsoft YaHei', 微软雅黑, SimHei, 黑体, sans-serif",
  'songti': "SimSun, 宋体, 'Zhongyi Songti', 中易宋体, serif"
};

/**
* Renders a <CharacterDetails /> component - all the content based on the hanzi chosen by the user
* @param  props
* @param  props.hanzi - the relevant hanzi
* @param  props.charData - the object for that character in Make Me A Hanzi
* @param  props.overrideStyles - used to set the CSS of the button
*/

class CharacterDetails extends Component {
  frequency() {
    const freq = this.props.charData.frequency;
    if (freq) {
      return `${freq} most common`;
    } else {
      return `No frequency data found`;
    }
  };

  render() {
    return (
      <div>
        <LargeCharacter style={FONTFAMILIES.heiti} char={this.props.charData.char} />
        <LargeCharacter style={FONTFAMILIES.songti} char={this.props.charData.char} />

        <Pronunciation charData={this.props.charData} />

        <Frequency charData={this.props.charData}
            clickHandler={this.props.clickHandler}
            showPinyin={this.props.showPinyin} />

        <Etymology charData={this.props.charData}
            clickHandler={this.props.clickHandler}
            showPinyin={this.props.showPinyin}
            showMore={this.props.showMore} />

        <AppearsIn charData={this.props.charData}
            clickHandler={this.props.clickHandler}
            showPinyin={this.props.showPinyin} />
      </div>
    );
  }
}

export default CharacterDetails;
