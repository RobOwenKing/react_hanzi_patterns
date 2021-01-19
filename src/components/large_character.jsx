import React, { Component } from 'react';

class LargeCharacter extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.charData.character}</h2>
        {this.props.charData.pinyin
            && <p>{this.props.charData.pinyin.join(', ')}</p>}
        {this.props.charData.definition && <p>{this.props.charData.definition}</p>}
      </div>
    );
  }
}

export default LargeCharacter;
