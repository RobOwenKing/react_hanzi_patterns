import React, { Component } from 'react';

/*
  Returns: <ShowMore />
  Props:   showMore  - Function
           direction - String
           max       - Integer
           displayed - Integer
  Used in: <AppearsIn /> from ./appears_in.jsx
           <Etymology /> from ./etymology.jsx
*/
class ShowMore extends Component {
  /*
    Params:  event - Event
    Returns: N/A
    Action:  Calls showMore(), passing it props.direction
    Used in: onClick() in render()
  */
  handleChange = (event) => {
    this.props.showMore(this.props.direction);
  };

  /*
    Returns: JSX
             A sentence saying how many of the rows/columns/words/characters are shown
               and how many there are in total
             A link to increase how many are shown
  */
  render() {
    // We use Math.min so we can just keep adding to displayed
    // without worrying about comparing it with max and capping it
    // props.direction is a full word in plural ("column", etc) so we can interpolate it straight here
    return (
      <div className="show-more">
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
