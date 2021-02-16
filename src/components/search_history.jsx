import React, { Component } from 'react';

import SmallCharacter from './small_character.jsx';

class SearchHistory extends Component {
  render() {
    return (
      <div>
        <h3>Search History</h3>
        {this.props.searchHistory.map((char) => {return (<SmallCharacter key={char} char={char} clickHandler={this.props.clickHandler} />)})}
      </div>
    );
  }
}

export default SearchHistory;
