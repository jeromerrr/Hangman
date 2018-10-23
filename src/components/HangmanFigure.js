import React, { Component } from 'react';
import figure1 from '../assets/stick_figure/figure1.svg'
import figure2 from '../assets/stick_figure/figure2.svg'
import figure3 from '../assets/stick_figure/figure3.svg'
import figure4 from '../assets/stick_figure/figure4.svg'
import figure5 from '../assets/stick_figure/figure5.svg'
import figure6 from '../assets/stick_figure/figure6.svg'

const HangmanFigure = (props) => {

  var figure = hangFigureSwitch(props.wrongGuess.length)

  function hangFigureSwitch(expr){
    switch(expr){
      default:
        // console.log("WRONGGUESS LENGTH::: ", expr);
      break
      case 1:
        // console.log("WRONGGUESS LENGTH::: ", expr);
        return figure1
      break
      case 2:
        // console.log("WRONGGUESS LENGTH::: ", expr);
        return figure2
      break
      case 3:
        // console.log("WRONGGUESS LENGTH::: ", expr);
        return figure3
      break
      case 4:
        // console.log("WRONGGUESS LENGTH::: ", expr);
        return figure4
      break
      case 5:
        // console.log("WRONGGUESS LENGTH::: ", expr);
        return figure5
      break
      case 6:
        // console.log("WRONGGUESS LENGTH::: ", expr);
        return figure6
      break
    }
  }
 
  return(
    
    <img src={figure} className="hangFigure" alt=""/>
  
    )
  }

export default HangmanFigure;
