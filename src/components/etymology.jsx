import React, { Component } from 'react';

import SmallCharacter from './small_character.jsx';

import { getPinyin, fillNeighbourhood } from '../helpers/data.js';

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

  formattedNeighbourhoodCell(char) {
    if (char) {
      return (<SmallCharacter char={char} clickHandler={this.props.clickHandler} showPinyin={this.props.showPinyin}  />);
    } else {
      return '';
    }
  }

  formatNeighbourhoodRow(row, index) {
    return (
      <tr key={index}>
        {row.map((char, index2) => {return <td key={index + ',' + index2}>{this.formattedNeighbourhoodCell(char)}</td>})}
      </tr>
    );
  };

  formattedNeighbourhood() {
    if (!this.props.newCharData.matches) {
      return 'No neighbourhood'
    } else {
      const neighbourhood = fillNeighbourhood(this.props.newCharData.matches, 10, 10);
      return (
        <table>
          <tbody>
            {neighbourhood.map((row, index) => this.formatNeighbourhoodRow(row, index))}
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
