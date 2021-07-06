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
    Params:  chars   - Array. Characters to format
             classes - String. CSS classes
    Returns: JSX
             A <SmallCharacter /> for each of chars
    Used in: getRandomCharacters()
  */
  formatChars(chars, classes) {
    return chars.map(char => getCharWithFrequency(char))
                .map((char, index) => {
        return (
          <SmallCharacter key={index} char={char}
              clickHandler={this.props.clickHandler}
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

    for (let i = 0; i < 15; i += 1) {
      const rand = Math.ceil((Math.random() ** 2) * 7500);
      rands.push(rand);
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
