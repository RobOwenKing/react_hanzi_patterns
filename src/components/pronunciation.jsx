import React, { Component } from 'react';

import { formatDefinition } from '../helpers/format_definition.js';
import { pinyinify } from '../helpers/pinyinify.js';

class Pronunciation extends Component {
  formatDef(def) {
    return formatDefinition(def, this.props.clickHandler, this.props.showPinyin, "");
  };

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
