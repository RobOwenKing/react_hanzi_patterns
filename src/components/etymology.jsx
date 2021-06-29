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
    Params:  hint - String explaining the etymology, possibly containing characters
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
    Params:  semantic - String, a single character
             hint - String explaining the etymology, possibly containing characters
             Note: 'hint' is the term used in ../data/dictionary.json
    Returns: JSX
             The semantic as a <SmallCharacter /> followed by the hint in brackets
          or "?"
    Used in: formatPhonosemantic()
  */
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

  /*
    Params:  phonetic - String, a single character
    Returns: JSX
             The phonetic as a <SmallCharacter /> followed by its pinyin in brackets
          or "?"
    Used in: formatPhonosemantic()
  */
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

  /*
    Params:  etymology - Object
    Returns: JSX
             The details of the etymology formatted with <SmallCharacter />s
    Used in: formatContents()
  */
  formatPhonosemantic(etymology) {
    return (
      <div>
        <div>
          {this.formatSemantic(etymology.semantic, etymology.hint)}
          +
          {this.formatPhonetic(etymology.phonetic)}
        </div>
        NB: The pronunciations given are from modern Mandarin, not those at the time the character was created.
      </div>
    );
  };

  /*
    Returns: JSX
             The details of the etymology formatted with <SmallCharacter />s
          or "No data found"
    Used in: render()
  */
  formatContents() {
    const etymology = this.props.charData.etymology;
    if (!etymology) { return `No data found`; }

    if (etymology.type === 'pictophonetic') {
      return this.formatPhonosemantic(etymology);
    } else if (etymology.type === 'ideographic' || etymology.type === 'pictographic') {
      return this.formatHint(etymology.hint);
    } else {
      return '';
    }
  };

  /*
    Params:  char - String, a single character
    Returns: JSX
             The char as a <SmallCharacter />
          or ''
    Used in: formatNeighbourhoodRow()
  */
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

  /*
    Params:  row - Array of characters
             index - Integer, the index of the row in the Neighbourhood
    Returns: JSX
             A <tr>, populated with <SmallCharacter />s
          or ''
    Used in: formatNeighbourhood()
  */
  formatNeighbourhoodRow(row, index) {
    return (
      <tr key={index}>
        {row.map((char, index2) => {return <td key={index + ',' + index2}>{this.formatNeighbourhoodCell(char)}</td>})}
      </tr>
    );
  };

  /*
    Returns: JSX
             Two <ShowMore />, one for Neighbourhood rows, one for columns
    Used in: formatNeighbourhood()
  */
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

  /*
    Returns: JSX
             <table> containing a character Neighbourhood
          or ''
    Used in: render()
  */
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
