import logo from './logo.svg';
import './App.css';

import SearchBar from './components/search_bar.jsx';
import LargeCharacter from './components/large_character.jsx';

var data = require('../src/data/test.json');
console.log(data);

function App() {
  return (
    <div>
      <SearchBar />
      <LargeCharacter char="也" />
    </div>
  );
}

export default App;
