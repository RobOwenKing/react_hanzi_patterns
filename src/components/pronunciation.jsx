import React, { Component } from 'react';

import { addSmallCharInStr } from '../helpers/add_small_chars_in_str.jsx';
import { formatDefinition } from '../helpers/format_definition.js';
import { pinyinify } from '../helpers/pinyinify.js';

class Pronunciation extends Component {
  formatDef(def) {
    return addSmallCharInStr(formatDefinition(def),
        this.props.clickHandler,
        this.props.showPinyin,
        ""
      );
  }

  pronunciations() {
    const pros = this.props.charData.pronunciations;
    if (pros) {
      return (
        pros.map((element, index) => {
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
      <div>
        {this.pronunciations()}
      </div>
    );
  }
}

export default Pronunciation;
