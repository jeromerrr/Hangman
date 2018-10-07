import React, { Component } from 'react';

class WrongWords extends Component {

  render() {

    return (
      <div>
        Wrong words: {this.props.wrongGuess}
      </div>
    );
  }
}

export default WrongWords;
