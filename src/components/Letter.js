import React, { Component } from 'react';

class Letter extends Component {

  render() {

    return (
      <div className="letters" id={`${this.props.eachLetter}`}> {`${this.props.eachLetter}`} 
      </div>
    );
  }
}

export default Letter;
