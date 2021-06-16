import React, { Component } from 'react';

import SmallCharacter from './small_character.jsx';

class AppearsIn extends Component {
  charactersWithComponent() {
    const chars = this.props.charData.appearsIn;
    if (chars) {
      return chars.map((char, index) => {return (<SmallCharacter key={index} char={char} clickHandler={this.props.clickHandler} showPinyin={this.props.showPinyin} />)})
          .reduce((prev, curr) => [prev, ' ', curr]);
    } else {
      return (<p>None found</p>)
    }
  };

  render() {
    return (
      <div>
        <h3>Characters which contain {this.props.charData.char}</h3>
        {this.charactersWithComponent()}
      </div>
    );
  }
}

export default AppearsIn;
