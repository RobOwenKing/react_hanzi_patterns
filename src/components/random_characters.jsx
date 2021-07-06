import React, { Component } from 'react';

// Used in: getRandomCharacters()
import { getCharWithFrequency } from '../helpers/data.js'

// Used in: formatNeighbours()
import SmallCharacter from './small_character.jsx';

/*
  Returns: <RandomCharacters />
  Props:   clickHandler - Function
           showPinyin   - Boolean
  Used in: <App /> from ./app.jsx
*/
class RandomCharacters extends Component {
  getRandomCharacters() {
    const chars = [];

    for (let i = 1; i < 16; i += 1) {
      const start = (i-1)*i*10;
      const rand = Math.ceil(Math.random() * i * 20) + start;
      chars.push(rand);
    }

    console.log(chars);
  }

  render() {
    return (
      <div>
        <p>Or click on one of the random characters below:</p>
        {this.getRandomCharacters()}
      </div>
    );
  }
}

export default RandomCharacters;
