import React, { Component } from 'react';

import ShowMore from './show_more.jsx';
import SmallCharacter from './small_character.jsx';
import WordCharacter from './word_character.jsx';

import { getPinyin, fillNeighbourhood } from '../helpers/data.js';

class Etymology extends Component {
  etymologyType() {
    if (!this.props.charData.etymology) { return 'Etymology'; }

    const type = this.props.charData.etymology.type;
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

  formatHint(hint) {
    const hintComponents = hint.split(/(\p{Script=Han})/u);
    const formattedComponents = hintComponents.map((str) => {
      if (/\p{Script=Han}/u.test(str)) {
        return (<WordCharacter char={str} clickHandler={this.props.clickHandler} />);
      } else {
        return str;
      }
    })
    return formattedComponents.reduce((prev, curr) => [prev, '', curr]);
  };

  etymologyContents() {
    if (!this.props.charData.etymology) { return `No data found`; }

    const etymology = this.props.charData.etymology;
    if (etymology.type === 'pictophonetic') {
      return [
          etymology.semantic,
          etymology.hint,
          etymology.phonetic
      ];
    } else if (etymology.type === 'ideographic') {
      return this.formatHint(etymology.hint);
    } else if (etymology.type === 'pictographic') {
      return this.formatHint(etymology.hint);
    } else {
      return '';
    }
  };

  formatSemantic(semantic, hint) {
    if (semantic) {
      return (
        <span>
          <SmallCharacter char={semantic} clickHandler={this.props.clickHandler} /> ({hint})
        </span>
        )
    } else {
      return ( <span className="char-mid">?</span>)
    }
  };

  formatPhonetic(phonetic) {
    if (phonetic) {
      return (
        <span>
          <SmallCharacter char={phonetic} clickHandler={this.props.clickHandler} /> ({getPinyin(phonetic)})
        </span>
        )
    } else {
      return ( <span className="char-mid">?</span>)
    }
  };

  formatContents() {
    const contents = this.etymologyContents();
    if (this.props.charData.etymology.type === 'pictophonetic') {
      return (
        <div>
          <div>
            {this.formatSemantic(contents[0], contents[1])}
            +
            {this.formatPhonetic(contents[2])}
          </div>
          NB: The pronunciations given are from modern Mandarin, not those at the time the character was created.
        </div>
      );
    } else {
      return contents;
    }
  };

  formatNeighbourhoodCell(char) {
    if (char) {
      return (<SmallCharacter char={char} clickHandler={this.props.clickHandler} showPinyin={this.props.showPinyin}  />);
    } else {
      return '';
    }
  };

  formatNeighbourhoodRow(row, index) {
    return (
      <tr key={index}>
        {row.map((char, index2) => {return <td key={index + ',' + index2}>{this.formatNeighbourhoodCell(char)}</td>})}
      </tr>
    );
  };

  showMore() {
    return (
      <div>
        <ShowMore direction="rows"
            showMore={this.props.showMore}
            displayed={this.props.charData.neighbourhood.displayedRows}
            max={this.props.charData.neighbourhood.maxRows} />
        <ShowMore direction="columns"
            showMore={this.props.showMore}
            displayed={this.props.charData.neighbourhood.displayedCols}
            max={this.props.charData.neighbourhood.maxCols} />
      </div>
    );
  };

  formatNeighbourhood() {
    const data = this.props.charData.neighbourhood;
    if (!data.matches) {
      return ('')
    } else {
      const neighbourhood = fillNeighbourhood(data.matches,
          data.displayedRows,
          data.displayedCols);
      return (
        <div>
          <table>
            <tbody>
              {neighbourhood.map((row, index) => this.formatNeighbourhoodRow(row, index))}
            </tbody>
          </table>
          {this.showMore()}
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h3>{this.etymologyType()}</h3>
        {this.formatContents()}
        {this.formatNeighbourhood()}
      </div>
    );
  };
};

export default Etymology;
