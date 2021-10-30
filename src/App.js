import './App.css';
import './style.css';

import { Component } from 'react';

// All used in: render()
import CharacterDetails from './components/character_details.jsx';
import RandomCharacters from './components/random_characters.jsx';
import SearchBar from './components/search_bar.jsx';
import SearchHistory from './components/search_history.jsx';
import Footer from './components/footer.jsx';

// Used in: componentDidMount(), handleSearch()
import * as data from './helpers/data.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      randomCharacters: [''],
      searchHistory: [],
      showPinyin: false
    };

    this.handleClick = this.handleClick.bind(this);

    // Needed to use hanzi library
    data.startHanzi();
  };

  /*
    Returns: Array of Strings
             15 random hanzi
    Used in: componentDidMount()
  */
  getRandomCharacters() {
    const rands = [];

    while (rands.length < 15) {
      const rand = Math.ceil((Math.random() ** 2) * 7500);
      if (!rands.includes(rand)) { rands.push(rand); }
    }

    this.setState({ randomCharacters: rands.sort((a, b) => a - b) });
  }

  componentDidMount() {
    this.getRandomCharacters();
  }

  /*
    Params:  char - String
    Returns: N/A
    Action:  Adds char to state.searchHistory
    Used in: handleSearch()
  */
  addToSearchHistory = (char) => {
    // We want the new char at the start of the search history
    // And duplicates (if any) removed
    // So add char to the start using destructuring
    // Then filter out duplicates
    const newSearchHistory = [char, ...this.state.searchHistory]
        .filter((term, index, self) => { return self.indexOf(term) === index });
    this.setState({ searchHistory: newSearchHistory });
  }

  /*
    Params:  searchTerm - String
    Returns: N/A
    Action:  When the user searches for/clicks on a single Chinese character
               Adds that character to state.searchHistory
               Updates state.charData so data for selected character is displayed
    Used in: <SearchBar /> from ./components/search_bar.jsx via render()
               as props.searchHandler
             <SmallCharacter /> from ./components/small_character.jsx via <CharacterDetails /> in render()
               as props.clickHandler
  */
  handleSearch = (searchTerm) => {
    // If the searchTerm is a single Chinese character
    if (searchTerm.length === 1 && /\p{Script=Han}/u.test(searchTerm)) {
      this.addToSearchHistory(searchTerm);

      const charData = data.getCharData(searchTerm);
      if (charData) {
        this.setState({ charData: charData });
      }
    }
  };

  /*
    Params:  event - Event
    Returns: N/A
    Action:  Updates the boolean value of state.showPinyin to match event.target.checked
    Used in: input#show-pinyin in render()
  */
  handleClickShowPinyin = (event) => {
    this.setState({ showPinyin: event.target.checked });
  }

  /*
    Params:  direction - String. One of rows, columns, characters, words
    Returns: N/A
    Action:  When the user clicks on a <ShowMore /> link
               Increment how many of that direction are displayed
    Used in: <ShowMore /> from ./components/show_more.jsx via render()
               via <AppearsIn /> and <Etymology />
  */
  showMore = (direction) => {
    const dataCopy = { ...this.state.charData };

    if (direction === "rows") {
      dataCopy.neighbourhood.displayedRows += 10;
    } else if (direction === "columns") {
      dataCopy.neighbourhood.displayedCols += 10;
    } else if (direction === "words") {
      dataCopy.appearsIn.displayedWords += 10;
    } else if (direction === "characters") {
      dataCopy.appearsIn.displayedChars += 20;
    }

    this.setState({ charData: dataCopy });
  }

  /*
    Returns: N/A
    Action:  Sets charData to null when user clicks on h1 title
               to "return to home sceen"
    Used in: render()
  */
  handleClick() {
    this.setState({ charData: null });
  }

  render() {
    return (
      <div className="container">
        <div>
          <header>
            <h1 onClick={this.handleClick} tabIndex="0">Patterns in the Hanzi</h1>
            <SearchBar searchHandler={this.handleSearch} />
            <p>
              <label htmlFor="show-pinyin" className="light-grey-text">Show pinyin? </label>
              <input type="checkbox" id="show-pinyin" name="show-pinyin"
                  onClick={this.handleClickShowPinyin} />
            </p>
          </header>
          {!this.state.charData &&
              <RandomCharacters
                  chars={this.state.randomCharacters}
                  clickHandler={this.handleSearch}
                  showPinyin={this.state.showPinyin}/>}
          {this.state.charData &&
              <CharacterDetails
                  charData={this.state.charData}
                  clickHandler={this.handleSearch}
                  showPinyin={this.state.showPinyin}
                  showMore={this.showMore} />}
        </div>
        <nav>
          <SearchHistory searchHistory={this.state.searchHistory} clickHandler={this.handleSearch} />
        </nav>
        <Footer />
      </div>
    );
  }
}

export default App;
