import React, { Component } from 'react';

/*
  Returns: <SearchBar />
  Props: searchHandler - Function
  Used in: <App /> from ../App.js
*/
class SearchBar extends Component {
  /*
    Params:  event - Event
    Returns: N/A
    Action:  Calls searchHandler(), passing it the input's value
    Used in: onChange() in render()
  */
  handleChange = (event) => {
    this.props.searchHandler(event.target.value);
  };

  render() {
    // We want to update every time the input's value changes
    return (
      <input type="text" className="search-bar"
          onChange={this.handleChange} placeholder="Any hanzi or pinyin" />
    );
  }
}

export default SearchBar;
