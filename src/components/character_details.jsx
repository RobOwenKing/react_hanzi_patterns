import React, { Component } from 'react';

import LargeCharacter from './large_character.jsx';

class CharacterDetails extends Component {
  render() {
    return (
      <div>
        <LargeCharacter charData={this.props.charData} />
      </div>
    );
  }
}

export default CharacterDetails;
