import React, { Component } from 'react';
import '../styling/styling.css'
import Letter from './Letter'
import HangmanFigure from './HangmanFigure'
import Scoreboard from './Scoreboard'
import randomWords from 'random-words'


class Game extends Component {
  constructor(props){
    super(props)

    this.myRef = React.createRef()


    this.state = {
      guess: "",
      hangWord: "",
      hangLetters: [],
      correctGuess: [],
      wrongGuess: [],
      allGuesses: [],
      displayedWord: [],
      alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
      buttonDisabled: false,
      changeAlphabetClass: true,
      score: 0,
    }
  }

  componentDidMount(){
    this.setHangWord()
  }


  //NOTE: 1. SELECT RANDOM WORD & RESETS GAME

  setHangWord = () => {
    let singleWord = randomWords()
    let splitLetters = singleWord.split("")
    console.log("RANDOM WORD: " + splitLetters);

    this.setState({
      hangWord: singleWord, 
      hangLetters: splitLetters, 
      guess: "", 
      correctGuess: [], 
      wrongGuess: [], 
      allGuesses: [], 
      buttonDisabled:"", 
      changeAlphabetClass: ""}, 
      function(){
      this.displayBlanks()
    })
  }
    //CALLBACK FUNCTION - TURNS LETTERS INTO BLANKS
      displayBlanks = () => {
        let hangLetters = this.state.hangLetters
        let blanks = this.state.hangLetters.map(letter => {
          return "_"
        })
        this.setState({
          displayedWord: blanks, 
          buttonDisabled: false, 
          changeAlphabetClass: true
        })
      }


  //NOTE: 2. GAME LOGIC - called onClick

  handleGuess = (e) => {
    e.preventDefault()
    let letterInputted = e.currentTarget.value.toLowerCase()
    e.currentTarget.disabled = true
    //^^^disables the alphabet button
    let passCurrentTarget = e.currentTarget
    this.setState({
      guess: letterInputted, 
      allGuesses: [...this.state.allGuesses, letterInputted]}, 
      function(){
        this.checkGuess(passCurrentTarget)
    })
  }


    //CALLBACK FUNCTION 1 OF 2  - checks to see if guess is correct or wrong
    checkGuess = (passCurrentTarget) => {
      let letterInputed = this.state.guess
      if(this.state.wrongGuess.includes(letterInputed)){
        alert("letter used already, try another")
        //^^^checks and alerts if user already clicked letter
      } else if(this.state.hangLetters.includes(letterInputed)){
        this.setState({correctGuess: [...this.state.correctGuess, letterInputed]}, function(){
          this.blanksToWords()
        })
        //^^^handles correct guesses - changes blank words, then checks for win with checkWin()
      } else {
        passCurrentTarget.className = 'alphabetClassWrong'
        this.setState({wrongGuess: [...this.state.wrongGuess, letterInputed]}, function(){
          this.checkWin()
        })
        //^^^handles wrong guesses, then checks for win with checkWin()
      }
    }

          //Changes blanks to show words 
          blanksToWords = () => {
            let hangLetters = this.state.hangLetters
            let displayedWord = [...this.state.displayedWord] //spread operator makes a copy of this.state.displayedWord
            let letterInputted = this.state.guess

            var indexes = []
            for(let i=0; i < hangLetters.length; i++){
              if(hangLetters[i] === letterInputted){
                indexes.push(i)
              }
            }

            indexes.forEach(i => {
              displayedWord.splice(i, 1, letterInputted)
            })

            this.setState({displayedWord: displayedWord}, function(){
              this.checkWin()
            })
          }


      //CALLBACK FUNCTION 2 OF 2 - checks win
      checkWin = (e) => {
        // console.log("moves left: " + (6-this.state.wrongGuess.length));
        let letterInputted = this.state.guess
        if(this.state.wrongGuess.length === 6){
          alert(`You LOSE, the correct word was "${this.state.hangWord.toUpperCase()}"`)
        } else if(this.state.displayedWord.includes("_") === false){
          alert("You WIN!")
          let addPoints = this.state.score + 100
          this.setState({score: addPoints})
        }
      }

      resetScore = () => {
        this.setState({score: 0})
      }

render() {

  let { hangLetters, displayedWord, wrongGuess } = this.state 

  var alphabetClassChanger = this.state.changeAlphabetClass ? 'alphabetClass' : 'alphabetClassWrong'
  //^^^ternary to reset alphabet className

    return (
      <div className="gamePage">

        <Scoreboard score={this.state.score} resetScore={this.resetScore}/>

        <HangmanFigure wrongGuess={wrongGuess}/>

        <div className="hangLettersContainer">
          {displayedWord.map((eachLetter, index) => {
              return (
                <Letter 
                eachLetter = {eachLetter}
                key = {`eachLetter + ${index}`}/>
              )
          })}
        </div>

        <div className="alphabetLettersContainer">
          {this.state.alphabet.map(eachAlphabetLetter => {
            return(
               <button 
                value={eachAlphabetLetter}  
                onClick={this.handleGuess} 
                className={alphabetClassChanger} 
                disabled={this.state.buttonDisabled} 
                key={eachAlphabetLetter}>
                  {eachAlphabetLetter} 
              </button>
              )
          })}
        </div>
          
        <button className="introButton" onClick={this.setHangWord}>
         NEW GAME
        </button>
            
      </div>
    );
  }
}

export default Game;
