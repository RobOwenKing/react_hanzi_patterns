import React, { Component } from 'react';

class ShowMore extends Component {
  handleChange = (event) => {
    this.props.showMore(this.props.direction);
  };

  render() {
    return (
      <div>
        {
          `Showing
          ${Math.min(this.props.displayed, this.props.max)}/${this.props.max}
          ${this.props.direction}. `
        }
        <span onClick={this.handleChange}>Show more</span>
      </div>
    );
  }
}

export default ShowMore;
