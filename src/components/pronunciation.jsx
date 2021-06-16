import React, { Component } from 'react';

import { pinyinify } from '../helpers/pinyinify.js';

class Pronunciation extends Component {
  pronunciations() {
    const pros = this.props.charData.pronunciations;
    if (pros) {
      return (
        pros.map((element, index) => {
          return (
              <p key={index}>
                <span className="bold">{pinyinify(element.pinyin)}</span>
                &nbsp;
                <span className="italics grey-text">{element.definition}</span>
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
