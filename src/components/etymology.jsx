import React, { Component } from 'react';

import SmallCharacter from './small_character.jsx';

import { getPinyin } from '../helpers/data.js';

class Etymology extends Component {
  etymologyType() {
    if (!this.props.newCharData.etymology) { return ''; }

    const type = this.props.newCharData.etymology.type;
    if (type === 'pictophonetic') {
      return 'Etymology: Phonosemantic';
    } else if (type === 'ideographic') {
      return 'Etymology: Ideographic';
    } else if (type === 'pictographic') {
      return 'Etymology: Pictographic';
    } else {
      return '';
    }
  };

  etymologyContents() {
    if (!this.props.newCharData.etymology) { return `No data found`; }

    const etymology = this.props.newCharData.etymology;
    if (etymology.type === 'pictophonetic') {
      return [
          etymology.semantic,
          etymology.hint,
          etymology.phonetic
      ];
    } else if (etymology.type === 'ideographic') {
      return etymology.hint;
    } else if (etymology.type === 'pictographic') {
      return etymology.hint;
    } else {
      return '';
    }
  };

  formattedContents() {
    const contents = this.etymologyContents();
    if (Array.isArray(contents)) {
      return (
        <div>
          <div>
            <SmallCharacter char={contents[0]} clickHandler={this.props.clickHandler} /> ({contents[1]}) +
            <SmallCharacter char={contents[2]} clickHandler={this.props.clickHandler} /> ({getPinyin(contents[2])})
          </div>
          NB: The pronunciations given are from modern Mandarin, not those at the time the character was created.
        </div>
      );
    } else {
      return contents;
    }
  };

  formatNeighbourhoodRow(row) {
    return (
      <tr>
        {row.map(char => {return <td><SmallCharacter char={char} clickHandler={this.props.clickHandler} /></td>})}
      </tr>
    );
  };

  formattedNeighbourhood() {
    const neighbourhood = this.props.newCharData.neighbourhood;
    if (!neighbourhood) {
      return 'No neighbourhood'
    } else {
      return (
        <table>
          <tbody>
            {neighbourhood.map(row => this.formatNeighbourhoodRow(row))}
          </tbody>
        </table>
      );
    }
  };

  render() {
    return (
      <div>
        <h3>{this.etymologyType()}</h3>
        {this.formattedContents()}
        {this.formattedNeighbourhood()}
      </div>
    );
  }
}

export default Etymology;
