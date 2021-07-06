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
  /*
    Params:  chars   - Array of Integers.
             classes - String. CSS classes
    Returns: JSX
             A <SmallCharacter /> for each of chars
    Used in: getRandomCharacters()
  */
  formatChars(chars, classes) {
    // First find the character with each frequency
    // Then make the <SmallCharacter />
    return chars.map(char => getCharWithFrequency(char))
                .map((char, index) => {
        return (
          <SmallCharacter key={index} char={char}
              clickHandler={this.props.clickHandler}
              showPinyin={this.props.showPinyin}
              classes={classes} />
        )
      }).reduce((prev, curr) => [prev, ' ', curr]);
  };

  /*
    Returns: JSX
             15 <SmallCharacter />s for random characters
    Used in: render()
  */
  getRandomCharacters() {
    const rands = [];

    while (rands.length < 15) {
      const rand = Math.ceil((Math.random() ** 2) * 7500);
      if (!rands.includes(rand)) { rands.push(rand); }
    }

    rands.sort((a, b) => a - b);
    return this.formatChars(rands, "char-mid margin-l-r");
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
