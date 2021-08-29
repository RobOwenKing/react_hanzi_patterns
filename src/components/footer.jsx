import React, { Component } from 'react';

/*
  Returns: <Footer />
  Used in: <App /> from ../App.js
*/
class Footer extends Component {
  render() {
    return (
      <footer>
        <small>A ReactJS app by Rob Owen King. You can find the code and even comment or contribute on <a href="https://github.com/RobOwenKing/react_hanzi_patterns" target="_blank" rel="noopener noreferrer">GitHub</a>.</small>
        <small>Here's my <a href="http://www.robowenking.com/" target="_blank" rel="noopener noreferrer">website</a>. I'm also on <a href="https://twitter.com/RobOwenKing" target="_blank" rel="noopener noreferrer">Twitter</a>.</small>
        <small>Built using data from <a href="https://github.com/skishore/makemeahanzi" target="_blank" rel="noopener noreferrer">Make Me A Hanzi</a> under the <a href="https://github.com/skishore/makemeahanzi/blob/master/LGPL" target="_blank" rel="noopener noreferrer">GNU Lesser General Public License</a>.</small>
        <small>Built using data from <a href="https://github.com/nieldlr/hanzi" target="_blank" rel="noopener noreferrer">HanziJS</a> under the <a href="https://github.com/nieldlr/hanzi/blob/master/LICENSE.txt" target="_blank" rel="noopener noreferrer">MIT License</a>.</small>
      </footer>
    );
  }
}

export default Footer;
