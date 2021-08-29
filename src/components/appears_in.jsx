import React, { Component } from 'react';

// Used in: formatDef()
import { formatDefinition } from '../helpers/format_definition.js';

// Used in: charsWithComponent(), wordsWithComponent()
import ShowMore from './show_more.jsx';
// Used in: formatChars(), wordToCharacters()
import SmallCharacter from './small_character.jsx';

/*
  Returns: <AppearsIn />
  Props:   charData     - Object:
             char           String
             appearsIn      Object {chars, displayedChars, maxChars, words, displayedWords, maxWords}
           clickHandler - Function. To pass to <SmallCharacter /> directly and via formatDefinition()
           showPinyin   - Boolean. To pass to <SmallCharacter /> directly and via formatDefinition()
           showMore     - Function. With directions characters and words
  Used in: <CharacterDetails /> from ./character_details.jsx
*/
class AppearsIn extends Component {
  /*
    Params:  chars - Array of characters to format
    Returns: JSX
             A <SmallCharacter /> for each of chars
    Used in: charsWithComponent()
  */
  formatChars(chars) {
    return chars.map((char, index) => {
        return (
          <SmallCharacter key={index} char={char}
              clickHandler={this.props.clickHandler}
              showPinyin={this.props.showPinyin}
              classes="char-mid margin-l-r" />
        )
      }).reduce((prev, curr) => [prev, ' ', curr]);
  };

  /*
    Returns: JSX
             A <SmallCharacter /> for every appearsIn.char plus a <ShowMore />
          or "None found"
    Used in: render()
  */
  charsWithComponent() {
    let chars = this.props.charData.appearsIn.chars;
    if (chars?.length) {
      // We don't always want to display all the characters
      chars = chars.slice(0, this.props.charData.appearsIn.displayedChars);
      // <ShowMore /> in here so it only appears when relevant
      return (
        <div>
          {this.formatChars(chars)}
          <ShowMore direction="characters"
            showMore={this.props.showMore}
            displayed={this.props.charData.appearsIn.displayedChars}
            max={this.props.charData.appearsIn.maxChars} />
        </div>
      );
    } else {
      return (<p>None found</p>);
    }
  };

  /*
    Params:  word - String of characters
             pinyin - String of space-separated pinyin with numbers
    Returns: JSX
             A <SmallCharacter /> for each char of word
    Used in: formatWords()
  */
  wordToCharacters(word, pinyin) {
    // For <SmallCharacter /> we need the pinyin for each char
    // So split the word's pinyin into individual characters
    const pinyins = pinyin.split(' ')
    // Destructure the word string to get array of chars
    // Then map that to <SmallCharacter />s
    return [...word].map((char, index) => {
        return (
          <SmallCharacter key={index} char={char}
              clickHandler={this.props.clickHandler}
              showPinyin={this.props.showPinyin} pinyin={pinyins[index]}
              classes="char-mid" />
        )})
        .reduce((prev, curr) => [prev, '', curr]);
  };

  /*
    Params:  def - String, a definition possibly containing characters
    Returns: JSX
             def with characters as <SmallCharacter />s and each '/' turned to '; '
    Used in: formatWords()
  */
  formatDef(def) {
    // formatDefinition() is imported from ../helpers/format_definition.js
    return formatDefinition(def, this.props.clickHandler, this.props.showPinyin, "");
  };

  /*
    Params:  words - An array of objects
    Returns: JSX
             A div for each word containing the word as <SmallCharacter />s and its definition
    Used in: wordsWithComponent()
  */
  formatWords(words) {
    return words.map((word, index) => {
        return (
          <div key={index}>
            <span className="margin-l-r">{this.wordToCharacters(word.simplified, word.pinyin)}</span>
            <span className="italics grey-text">{this.formatDef(word.definition)}</span>
          </div>
        )})
        .reduce((prev, curr) => [prev, ' ', curr]);
  }

  /*
    Returns: JSX
             The result of formatWords() plus a <ShowMore />
          or "None found"
    Used in: render()
  */
  wordsWithComponent() {
    let words = this.props.charData.appearsIn.words;
    if (words?.length) {
      // We don't always want to display all the words
      words = words.slice(0, this.props.charData.appearsIn.displayedWords);
      // <ShowMore /> in here so it only appears when relevant
      return (
        <div>
          {this.formatWords(words)}
          <ShowMore direction="words"
            showMore={this.props.showMore}
            displayed={this.props.charData.appearsIn.displayedWords}
            max={this.props.charData.appearsIn.maxWords} />
        </div>
      );
    } else {
      return (<p>None found</p>);
    }
  };

  render() {
    return (
      <div>
        <section>
          <h3>Characters which contain {this.props.charData.char}</h3>
          {this.charsWithComponent()}
        </section>
        <section>
          <h3>Words/expressions which contain {this.props.charData.char}</h3>
          {this.wordsWithComponent()}
        </section>
      </div>
    );
  }
}

export default AppearsIn;
