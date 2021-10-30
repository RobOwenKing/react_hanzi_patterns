import React, { Component } from 'react';

// Used in: formatDef()
import { formatDefinition } from '../helpers/format_definition.js';
// Used in: pronunciations()
import { pinyinify } from '../helpers/pinyinify.js';

/*
  Returns: <Pronunciation />
  Props:   charData     - Object:
             pronunciations [{pinyin, definition}]
           clickHandler - Function
           showPinyin   - Boolean
  Used in: <CharacterDetails /> from ./character_details.jsx
*/
class Pronunciation extends Component {
  /*
    Params:  def - String, a definition possibly containing characters
    Returns: JSX
             def with characters as <SmallCharacter />s and each '/' turned to '; '
    Used in: pronunciations()
  */
  formatDef(def) {
    return formatDefinition(def, this.props.clickHandler, this.props.showPinyin, "");
  };

  /*
    Returns: JSX
             An entry for each element of props.charData.pronunciations with:
               Relevant pinyin with numbers converted to tone marks
               Relevant definition including <SmallCharacter />s where applicable
          or "No pronunciations found"
    Used in: formatWords()
  */
  pronunciations() {
    const pros = this.props.charData.pronunciations;
    if (pros) {
      return (
        pros.filter((obj, id, arr) => {
              return arr.findIndex(first => first.definition === obj.definition) === id
            }).map((element, index) => {
              return (
                  <p key={index}>
                    <span className="bold">{pinyinify(element.pinyin)}</span>
                    &nbsp;
                    <span className="italics grey-text">{this.formatDef(element.definition)}</span>
                  </p>
                )
            })
      )
    } else {
      return `No pronunciations found`;
    }
  };

  render() {
    return (
      <section>
        {this.pronunciations()}
      </section>
    );
  }
}

export default Pronunciation;
