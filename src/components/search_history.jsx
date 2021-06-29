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
    Returns: JSX
    Used in: render()
  */
  render() {
    return (
      <div className="search-history">
        <span className="light-grey-text">
          <SmallCharacter char={'搜'} clickHandler={this.props.clickHandler} classes="char-mid" />
          <SmallCharacter char={'索'} clickHandler={this.props.clickHandler} classes="char-mid" />
          <SmallCharacter char={'记'} clickHandler={this.props.clickHandler} classes="char-mid" />
          <SmallCharacter char={'录'} clickHandler={this.props.clickHandler} classes="char-mid" />
        </span>
        &nbsp;·&nbsp;
        {this.props.searchHistory.map((char, index) => {
          return (
            <SmallCharacter key={index} char={char}
                clickHandler={this.props.clickHandler}
                classes="char-mid" />
          )
        })}
      </div>
    );
  }
}

export default SearchHistory;
