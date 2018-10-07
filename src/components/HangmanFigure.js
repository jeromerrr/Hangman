import React, { Component } from 'react';
// import { figure1, figure2, figure3, figure4, figure5 } from '../public/stick_figure'

class HangmanFigure extends Component {

  render() {
    console.log(`figure${this.props.wrongGuess.length}`);
    return (
      <div>
        <p id="hangman">
        INSERT HANGMAN FIGURE
        </p>

        <svg class="path" width="100" height="100">
          <circle cx="50" cy="50" r="40" stroke="black" stroke-width="4" fill="none" />
        </svg>

        <img src={`../public/stick_figure/figure${this.props.wrongGuess.length}`}/>

        <img src={`/Users/jeromemac/Development/hangman_game/public/stick_figure/figure${this.props.wrongGuess.length}.svg`}/>

        <img src='../public/stick_figure/figure1.svg'/>

        <img src="/Users/jeromemac/Development/hangman_game/public/stick_figure/figure2.svg"/>

        <img src="/Users/jeromemac/Development/hangman_game/public/favicon.ico"/>


      </div>
    );
  }
}

export default HangmanFigure;
