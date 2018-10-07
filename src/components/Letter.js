import React, { Component } from 'react';

class Letter extends Component {

  render() {

    return (
      <div>
        <p className="letters" id={`${this.props.eachLetter}`}> {`${this.props.eachLetter}`} </p>
      </div>
    );
  }
}

export default Letter;
