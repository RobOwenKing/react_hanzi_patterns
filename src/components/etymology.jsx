import React, { Component } from 'react';

// Used in: showMore()
import ShowMore from './show_more.jsx';
// Used in: formatSemantic(), formatPhonetic(), formatNeighbourhoodCell()
import SmallCharacter from './small_character.jsx';

// Used in: formatHint()
import { addSmallCharInStr } from '../helpers/add_small_chars_in_str.jsx';
// Used in: formatPhonetic()
//          formatNeighbourhood()
import { getPinyin, fillNeighbourhood } from '../helpers/data.js';

/*
  Returns: <Etymology />
  Props:   charData
           clickHandler
           showPinyin
           showMore
  Used in: <CharacterDetails /> from ./character_details.jsx
*/
class Etymology extends Component {
  /*
    Returns: String
             To be used as a section heading
    Used in: render()
  */
  etymologyType() {
    if (!this.props.charData.etymology) { return 'Etymology'; }

    const type = this.props.charData.etymology.type;
    if (type === 'pictophonetic') {
      // I prefer the term phonosemantic over the dataset's pictophonetic
      return 'Etymology: Phonosemantic Compound';
    } else if (type === 'ideographic') {
      return 'Etymology: Ideographic';
    } else if (type === 'pictographic') {
      return 'Etymology: Pictographic';
    } else {
      return 'Etymology';
    }
  };

  /*
    Params:  hint - A string explaining the etymology, possibly containing characters
             Note: 'hint' is the term used in ../data/dictionary.json
    Returns: JSX
             The result of addSmallCharInStr() - the hint with characters as <SmallCharacter />s
    Used in: etymologyContents()
  */
  formatHint(hint) {
    // The <SmallCharacter />s returned are given .char-mid but no margin, being in the middle of sentences
    return addSmallCharInStr(hint, this.props.clickHandler, this.props.showPinyin, "char-mid");
  };

  /*
    Returns: JSX
    Used in: formatContents()
  */
  etymologyContents() {
    if (!this.props.charData.etymology) { return `No data found`; }

    const etymology = this.props.charData.etymology;
    if (etymology.type === 'pictophonetic') {
      return [
          etymology.semantic,
          etymology.hint,
          etymology.phonetic
      ];
    } else if (etymology.type === 'ideographic' || etymology.type === 'pictographic') {
      return this.formatHint(etymology.hint);
    } else {
      return '';
    }
  };

  formatSemantic(semantic, hint) {
    if (semantic) {
      return (
        <span>
          <SmallCharacter char={semantic}
              clickHandler={this.props.clickHandler}
              classes="char-mid margin-l-r" /> ({hint})
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
          <SmallCharacter char={phonetic}
              clickHandler={this.props.clickHandler}
              classes="char-mid margin-l-r" /> ({getPinyin(phonetic)})
        </span>
        )
    } else {
      return ( <span className="char-mid">?</span>)
    }
  };

  formatContents() {
    const contents = this.etymologyContents();
    if (this.props.charData.etymology?.type === 'pictophonetic') {
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
      return (
        <SmallCharacter char={char} clickHandler={this.props.clickHandler}
            showPinyin={this.props.showPinyin}
            classes="char-mid margin-l-r"  />
      );
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
