import './App.css';
import './style.css';

import { Component } from 'react';

import SearchBar from './components/search_bar.jsx';
import CharacterDetails from './components/character_details.jsx';
import SearchHistory from './components/search_history.jsx';

import { data, hanzi } from './helpers/data.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchHistory: [],
      showPinyin: false
    };
  };

  componentDidMount() {
    hanzi.start();
  };

  handleSearch = (searchTerm) => {
    // If the searchTerm is a single Chinese character
    if (searchTerm.length === 1 && /\p{Script=Han}/u.test(searchTerm)) {
      const newSearchHistory = [searchTerm, ...this.state.searchHistory]
          .filter((term, index, self) => { return self.indexOf(term) === index });
      this.setState({ searchHistory: newSearchHistory });

      const charData = data.find(element => element.character === searchTerm);
      const charDefn = hanzi.definitionLookup(searchTerm);
      if (charData) {
        this.setState({ charData: charData });
        if (charData.etymology.type === 'pictophonetic') {
          console.log(data.filter(element => {return element.etymology &&
              element.etymology.type === 'pictophonetic' &&
              element.etymology.phonetic === charData.etymology.phonetic}))
        }
      }
      if (charDefn) {
        this.setState({ charDefn: charDefn });
      }
    }
  };

  handleClickShowPinyin = (event) => {
    this.setState({ showPinyin: event.target.checked });
  }

  render() {
    return (
      <div className="container">
        <div>
          <div className="top">
            <h1>Patterns in the Hanzi</h1>
            <SearchBar searchHandler={this.handleSearch} />
            <div>
              <label htmlFor="show-pinyin">Show pinyin? </label>
              <input type="checkbox" id="show-pinyin" name="show-pinyin"
                  onClick={this.handleClickShowPinyin} />
            </div>
          </div>
          {this.state.charData &&
              <CharacterDetails hanzi={hanzi} charData={this.state.charData}
                  charDefn={this.state.charDefn} clickHandler={this.handleSearch}
                  showPinyin={this.state.showPinyin} />}
        </div>
        <SearchHistory searchHistory={this.state.searchHistory} clickHandler={this.handleSearch} />
      </div>
    );
  }
}

export default App;
