import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

import SearchBar from './components/search_bar.jsx';
import LargeCharacter from './components/large_character.jsx';

var data = require('../src/data/test.json');
console.log(data);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      char: "也"
    };
  };

  handleSearch = (event) => {
    console.log(event.target.value);
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
