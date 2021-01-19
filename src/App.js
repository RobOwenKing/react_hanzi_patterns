import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

import SearchBar from './components/search_bar.jsx';
import LargeCharacter from './components/large_character.jsx';

// const data = require('../src/data/test.json');
const data = require('../src/data/dictionary.json');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  };

  handleSearch = (searchTerm) => {
    if (searchTerm.length === 1) {
      if (data.some(element => element.character === searchTerm)) {
        this.setState({ char: searchTerm });
      }
    }
  };

  render() {
    return (
      <div>
        <SearchBar searchHandler={this.handleSearch} />
        <LargeCharacter char={this.state.char} />
      </div>
    );
  }
}

export default App;
