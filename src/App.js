import './App.css';
import './style.css';

import { Component } from 'react';

import SearchBar from './components/search_bar.jsx';
import CharacterDetails from './components/character_details.jsx';

// const data = require('../src/data/test.json');
const data = require('../src/data/dictionary.json');

// Using HanziJS from https://github.com/nieldlr/hanzi under MIT license
var hanzi = require("hanzi");
hanzi.start();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  };

  handleSearch = (searchTerm) => {
    if (searchTerm.length === 1) {
      const charData = data.find(element => element.character === searchTerm);
      if (charData) {
        this.setState({ charData: charData });
      }
    }
  };

  render() {
    return (
      <div className="container">
        <div className="top">
          <h1>Patterns in the Hanzi</h1>
          <SearchBar searchHandler={this.handleSearch} />
        </div>
        {this.state.charData && <CharacterDetails charData={this.state.charData} />}
      </div>
    );
  }
}

export default App;
