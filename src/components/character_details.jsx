import React, { Component } from 'react';

// All used in: render()
import AppearsIn from './appears_in.jsx';
import Etymology from './etymology.jsx';
import Frequency from './frequency.jsx';
import LargeCharacter from './large_character.jsx';
import Pronunciation from './pronunciation.jsx';

// Used in: render()
import { FONT_FAMILIES } from '../helpers/font_families.js';

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
      <article>
        <LargeCharacter style={FONT_FAMILIES.heiti} char={this.props.charData.char} />
        <LargeCharacter style={FONT_FAMILIES.songti} char={this.props.charData.char} />
        <LargeCharacter style={FONT_FAMILIES.xing} char={this.props.charData.char} />
        <LargeCharacter style={FONT_FAMILIES.liu} char={this.props.charData.char} />

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
      </article>
    );
  }
}

export default CharacterDetails;
