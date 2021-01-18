import React, { Component } from 'react';

class SearchBar extends Component {
  handleChange = (event) => {
    this.props.searchHandler(event);
  };

  render() {
    return (
      <input type="text" className="search-bar"
          onChange={this.handleChange} />
    );
  }
}

export default SearchBar;
