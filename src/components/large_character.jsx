import React, { Component } from 'react';

class LargeCharacter extends Component {
  render() {
    const etymology = this.props.charData.etymology;
    let formattedEtymology;
    if (etymology.type !== "pictophonetic") {
      formattedEtymology = `${etymology.type}: ${etymology.hint}`;
    } else {
      formattedEtymology = `${etymology.phonetic} (phonetic) + ${etymology.semantic} (semantic)`;
    }
    return (
      <div>
        <h2>{this.props.charData.character}</h2>
        {this.props.charData.pinyin
            && <p>{this.props.charData.pinyin.join(', ')}</p>}
        {this.props.charData.definition && <p>{this.props.charData.definition}</p>}
        {this.props.charData.etymology && <p>{formattedEtymology}</p>}
      </div>
    );
  }
}

export default LargeCharacter;
