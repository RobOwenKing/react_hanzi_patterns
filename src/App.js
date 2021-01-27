import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

import SearchBar from './components/search_bar.jsx';
import CharacterDetails from './components/character_details.jsx';

// const data = require('../src/data/test.json');
const data = require('../src/data/dictionary.json');

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
      <div>
        <SearchBar searchHandler={this.handleSearch} />
        {this.state.charData && <CharacterDetails charData={this.state.charData} />}
      </div>
    );
  }
}

export default App;
