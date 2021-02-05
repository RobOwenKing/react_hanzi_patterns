import React, { Component } from 'react';

import SmallCharacter from './small_character.jsx';

import { pinyinify } from '../helpers/pinyinify.js';

class Etymology extends Component {
  formattedContents() {
    const contents = this.props.contents;
    if (Array.isArray(contents)) {
      return (
        <div>
          <SmallCharacter char={contents[0]} hanzi={this.props.hanzi} clickHandler={this.props.clickHandler} /> ({contents[1]}) +
          <SmallCharacter char={contents[2]} hanzi={this.props.hanzi} clickHandler={this.props.clickHandler} />
        </div>
      );
    } else {
      return this.props.contents;
    }
  };

  render() {
    return (
      <div>
        <h3>Etymology: {this.props.type}</h3>
        {this.formattedContents()}
      </div>
    );
  }
}

export default Etymology;
