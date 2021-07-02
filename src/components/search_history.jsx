import React, { Component } from 'react';

// Used in: render()
import SmallCharacter from './small_character.jsx';

/*
  Returns: <SearchHistory />
  Props:   searchHistory - Array. Elements are String (characters)
           clickHandler  - Function
  Used in: <CharacterDetails /> from ./character_details.jsx
*/
class SearchHistory extends Component {
  /*
    Params:  chars   - Array. Characters to format
             classes - String. CSS classes
    Returns: JSX
             A <SmallCharacter /> for each of chars
    Used in: render()
  */
  formatChars(chars, classes) {
    if (chars.length) {
      return chars.map((char, index) => {
          return (
            <SmallCharacter key={index} char={char}
                clickHandler={this.props.clickHandler}
                classes={classes} />
          )
        }).reduce((prev, curr) => [prev, ' ', curr]);
    } else {
      return ""
    }
  };

  render() {
    return (
      <div className="search-history">
        {this.formatChars(['搜', '索', '记','录'], "light-grey-text char-mid")}
        &nbsp;‧&nbsp;
        {this.formatChars(this.props.searchHistory, "char-mid")}
      </div>
    );
  }
}

export default SearchHistory;
