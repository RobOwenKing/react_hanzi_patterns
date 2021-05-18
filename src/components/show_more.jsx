import React, { Component } from 'react';

class ShowMore extends Component {
  handleChange = (event) => {
    this.props.showMore(this.props.direction);
  };

  render() {
    return (
      <span onClick={this.handleChange}>Show more</span>
    );
  }
}

export default ShowMore;
