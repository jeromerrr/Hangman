import React, { Component } from 'react';

const Letter = (props) => {

    return (
      <div className="letters" id={`${props.eachLetter}`}> 
        {`${props.eachLetter}`} 
      </div>
    )
  }

export default Letter;
