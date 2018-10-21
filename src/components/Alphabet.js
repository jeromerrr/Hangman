import React, { Component } from 'react';

class Alphabet extends Component {


  render() {
    let x = 1
    console.log(this.props.eachAlphabetLetter);
    return (
      <div>
        <p>
          {`${this.props.eachAlphabetLetter}`}
        </p>
      </div>
    );
  }
}

export default Alphabet;
