import React, { Component } from 'react';

const Scoreboard = (props) => {
  return(
    <div className="scoreBoardContainer">
      <p className="scoreTitle">SCORE: {`${props.score} points`}</p>
      <button className="scoreResetButton" onClick={props.resetScore}> reset </button>
    </div>
  )
}

export default Scoreboard;