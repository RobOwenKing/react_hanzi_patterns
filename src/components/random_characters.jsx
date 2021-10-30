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


  render() {
    return (
      <div>
        <p>Or click on one of the random characters below:</p>
        {this.formatChars(this.props.chars, "char-mid margin-l-r")}
      </div>
    );
  }
}

export default RandomCharacters;
