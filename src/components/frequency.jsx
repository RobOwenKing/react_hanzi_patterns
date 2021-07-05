import React, { Component } from 'react';

// Used in: formatFrequency()
import { ordinalSuffix } from '../helpers/ordinal_suffix.js';

// Used in: formatNeighbours()
import SmallCharacter from './small_character.jsx';

/*
  Returns: <Frequency />
  Props:   charData     - Object:
             frequency      {dots, frequency, neighbours}
           clickHandler - Function
           showPinyin   - Boolean
  Used in: <CharacterDetails /> from ./character_details.jsx
*/
class Frequency extends Component {
  /*
    Returns: JSX
             A <SmallCharacter /> for each character of neighbouring frequency
    Used in: formatFrequency()
  */
  formatNeighbours() {
    const dots = this.props.charData.frequency.dots;
    const neighbours = this.props.charData.frequency.neighbours;
    return (
      <div>
        {dots[0] && "⋯⋯" /*Dots at the start of the list if more characters not shown*/}
        {neighbours.map((char, index) =>
            {return (
              <SmallCharacter key={index} char={char}
                  clickHandler={this.props.clickHandler}
                  showPinyin={this.props.showPinyin}
                  classes="char-mid margin-l-r" />
            )}
          )}
        {dots[1] && "⋯⋯" /*Dots at the end of the list if more characters not shown*/}
      </div>
    );
  };

  /*
    Returns: JSX
             The frequency as an ordinal number in a sentence
                then a <SmallCharacter /> for each frequency neighbour
          or 'No frequency data found'
    Used in: render()
  */
  formatFrequency() {
    const freq = this.props.charData.frequency;
    if (freq) {
      return (
        <div>
          {this.formatNeighbours()}
          <div>{ordinalSuffix(freq.frequency)} most common</div>
        </div>
      );
    } else {
      return `No frequency data found`;
    }
  };

  render() {
    return (
      <section>
        <h3>Frequency</h3>
        {this.formatFrequency()}
      </section>
    );
  }
}

export default Frequency;
