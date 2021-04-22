import React, { Component } from 'react';

import Etymology from './etymology.jsx';
import LargeCharacter from './large_character.jsx';
import SmallCharacter from './small_character.jsx';

import { pinyinify } from '../helpers/pinyinify.js';

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
    const freq = this.props.newCharData.frequency;
    if (freq) {
      return `${freq} most common`;
    } else {
      return `No frequency data found`;
    }
  };

  pronunciations() {
    const pros = this.props.newCharData.pronunciations;
    if (pros) {
      return (
        pros.map((element, index) => {
          return (
              <p key={index}>
                <span className="bold">{pinyinify(element.pinyin)}</span>
                &nbsp;
                <span className="italics grey-text">{element.definition}</span>
              </p>
            )
        })
      )
    } else {
      return `No pronunciations found`;
    }
  };

  charactersWithComponent() {
    const chars = this.props.newCharData.appearsIn;
    if (chars) {
      return chars.map((char, index) => {return (<SmallCharacter key={index} char={char} clickHandler={this.props.clickHandler} showPinyin={this.props.showPinyin} />)})
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

        {this.props.charDefn && this.pronunciations()}

        <Etymology newCharData={this.props.newCharData} getPinyin={this.props.getPinyin} hanzi={this.props.hanzi} clickHandler={this.props.clickHandler} />

        <h3>Characters which contain {this.props.charData.character}</h3>
        {this.charactersWithComponent()}
      </div>
    );
  }
}

export default CharacterDetails;
