import React, { Component } from 'react';

// Used in: pinyin()
import { getPinyin } from '../helpers/data.js';
// Used in: pinyin()
import { pinyinify } from '../helpers/pinyinify.js';

/*
  Returns: <SmallCharacter />
  Props:   char         - String
           pinyin       - String. Optional.
           classes      - Array. Elements are String (CSS classes for the character)
           clickHandler - Function
           showPinyin   - Boolean
  Used in: <AppearsIn />       from ./appears_in.jsx
           <Etymology />       from ./etymology.jsx
           <Frequency />       from ./frequency.jsx
           <SearchHistory />   from ./search_history.jsx
           addSmallCharInStr() from ../helpers/add_small_chars_in_str.jsx
*/
class SmallCharacter extends Component {
  /*
    Params:  event - Event
    Returns: N/A
    Action:  Calls clickHandler(), passing it props.char
    Used in: onClick() in render()
  */
  handleClick = (event) => {
    this.props.clickHandler(this.props.char);
  };

  /*
    Returns: String
             Pinyin corresponding to props.char
    Used in: component()
  */
  pinyin = () => {
    if (this.props.pinyin) {
      // If we've been given pinyin to display
      return pinyinify(this.props.pinyin);
    } else {
      // If we've been left to look it up for ourselves
      return getPinyin(this.props.char);
    }
  };

  /*
    Returns: JSX
             The character in question with pinyin as ruby annotation if props.showPinyin is true
    Used in: component()
  */
  component() {
    if (this.props.showPinyin) {
      return (
        <ruby onClick={this.handleClick}>
          <rb className={this.props.classes}
              tabIndex="0">{this.props.char}</rb>
          <rp>(</rp><rt>{this.pinyin()}</rt><rp>)</rp>
        </ruby>
      );
    } else {
      return (
        <span onClick={this.handleClick}
            className={this.props.classes}
            tabIndex="0">{this.props.char}</span>
      );
    }
  };

  render() {
    return (
      <span className="small-character">
        {this.component()}
      </span>
    );
  };
}

export default SmallCharacter;
