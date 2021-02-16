import React, { Component } from 'react';

import SmallCharacter from './small_character.jsx';

class SearchHistory extends Component {
  render() {
    return (
      <div className="search-history">
        <span className="light-grey-text">
          <SmallCharacter char={'搜'} clickHandler={this.props.clickHandler} />
          <SmallCharacter char={'索'} clickHandler={this.props.clickHandler} />
          <SmallCharacter char={'记'} clickHandler={this.props.clickHandler} />
          <SmallCharacter char={'录'} clickHandler={this.props.clickHandler} />
        </span>
        &nbsp;·&nbsp;
        {this.props.searchHistory.map((char) => {return (<SmallCharacter key={char} char={char} clickHandler={this.props.clickHandler} />)})}
      </div>
    );
  }
}

export default SearchHistory;
