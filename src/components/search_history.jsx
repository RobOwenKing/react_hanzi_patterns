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
    Used in: formatSearchHistory()
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

  /*
    Returns: JSX
             props.searchHistory displayed nicely if non-empty
    Used in: render()
  */
  formatSearchHistory() {
    if (this.props.searchHistory.length) {
      return (
        <div>
          {this.formatChars(['搜', '索', '记','录'], "light-grey-text char-mid")}
          <span className="char-mid" style={{marginTop:"0.2em", marginBottom:"0.2em"}}>‧</span>
          {this.formatChars(this.props.searchHistory, "char-mid")}
        </div>
      )
    } else {
      return ("")
    }
  }

  render() {
    return (
      <div className="search-history">
        {this.formatSearchHistory()}
      </div>
    );
  }
}

export default SearchHistory;
