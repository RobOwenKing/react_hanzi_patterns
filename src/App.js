import './App.css';
import './style.css';

import { Component } from 'react';

import SearchBar from './components/search_bar.jsx';
import CharacterDetails from './components/character_details.jsx';

// const data = require('../src/data/test.json');
const data = require('../src/data/dictionary.json');

// Using HanziJS from https://github.com/nieldlr/hanzi under MIT license
const hanzi = require("hanzi");

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  };

  componentDidMount() {
    hanzi.start();
  };

  handleSearch = (searchTerm) => {
    if (searchTerm.length === 1) {
      const charData = data.find(element => element.character === searchTerm);
      const charDefn = hanzi.definitionLookup(searchTerm);
      if (charData) {
        this.setState({ charData: charData });
      }
      if (charDefn) {
        this.setState({ charDefn: charDefn });
      }
    }
  };

  render() {
    return (
      <div className="container">
        <div className="top">
          <h1>Patterns in the Hanzi</h1>
          <SearchBar searchHandler={this.handleSearch} />
          <div>
            <label for="show-pinyin">Show pinyin? </label>
            <input type="checkbox" id="show-pinyin" name="show-pinyin" />
          </div>
        </div>
        {this.state.charData &&
            <CharacterDetails hanzi={hanzi} charData={this.state.charData}
                charDefn={this.state.charDefn} clickHandler={this.handleSearch} />}
      </div>
    );
  }
}

export default App;
