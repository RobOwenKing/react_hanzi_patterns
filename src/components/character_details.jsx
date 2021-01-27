import React, { Component } from 'react';

import LargeCharacter from './large_character.jsx';

class CharacterDetails extends Component {
  formattedEtymology() {
    const etymology = this.props.charData.etymology;
    if (etymology.type !== "pictophonetic") {
      return `${etymology.type}: ${etymology.hint}`;
    } else {
      return `${etymology.phonetic} (phonetic) + ${etymology.semantic} (semantic)`;
    }
  };

  render() {
    return (
      <div>
        <LargeCharacter charData={this.props.charData} />
        {this.props.charData.pinyin
            && <p>{this.props.charData.pinyin.join(', ')}</p>}
        {this.props.charData.definition && <p>{this.props.charData.definition}</p>}
        {this.props.charData.etymology && <p>{this.formattedEtymology()}</p>}
      </div>
    );
  }
}

export default CharacterDetails;
