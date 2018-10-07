import React, { Component } from 'react';

class Alphabet extends Component {
//
//   shouldComponentUpdate(nextProps, nextState) {
//   if (nextProps.clickWorks === this.props.clickWorks) {
//     return false;
//   } else {
//     return true;
//   }
// }

  render() {
    let x = 1
    console.log(`ALPHABET COMPONENT IS RENDERING!!! + ${x +=1}`);
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
