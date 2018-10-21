import React, { Component } from 'react';
import './styling.css'
import Letter from './Letter'
// import WrongWords from './WrongWords'
// import HangmanFigure from './HangmanFigure'
// import Alphabet from './Alphabet'
// import { log } from 'handlebars';

import figure1 from '../assets/stick_figure/figure1.svg'
import figure2 from '../assets/stick_figure/figure2.svg'
import figure3 from '../assets/stick_figure/figure3.svg'
import figure4 from '../assets/stick_figure/figure4.svg'
import figure5 from '../assets/stick_figure/figure5.svg'
import figure6 from '../assets/stick_figure/figure6.svg'

// import Hangperson from './Hangperson'


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
      changeAlphabetClass: true
      
    }
  }

  componentDidMount(){
    this.setHangWord()
  }


  //BUG: FEATURES PENDING:
  //-Input validation - prevent double entries in user's guesses
  //-Once game is over remove user input field
  //START SCREEN WITH HANGMAN TITLE AND A START BUTTON THAT ROUTES YOU HERE


  //NOTE: STEP 1. SELECT RANDOM WORD & RESETS GAME (HAS 1 CALLBACK FUNCTION)
  //BUG: REPLACE wordArray with an API that provides random words
  //Called when startGame button is clicked
  //Words are displayed as <P> in render below
  setHangWord = () => {
    // let el = document.getElementsByClassName('alphabetClass')
    // console.log("DOCUMENTCLASS::: ", el);
    // el.disabled=false


    //NOTE: wordArray is only used for development & testing
    // let wordArray = ["cat", "dog", "mouse", "bear", "monkey", "rhino", "triceratops"]
    // let singleWord = wordArray[Math.floor(Math.random() * wordArray.length)]

    //NOTE: using random-words package to get a random word
    let singleWord = randomWords()

    let splitLetters = singleWord.split("")
    console.log("RANDOM WORD: " + splitLetters);
    this.setState({hangWord: singleWord, hangLetters: splitLetters, guess: "", correctGuess: [], wrongGuess: [], allGuesses: [], buttonDisabled:"", changeAlphabetClass: ""}, function(){
      this.displayBlanks()
    })
  }
    //TURN LETTERS INTO BLANKS - CALLBACK FUNCTION
      displayBlanks = () => {
        // console.log("displayBlanks START:::");

        let hangLetters = this.state.hangLetters
        let blanks = this.state.hangLetters.map(letter => {
          return "_"
        })
        // console.log("Here are the blanks: " + blanks);
        this.setState({displayedWord: blanks, buttonDisabled: false, changeAlphabetClass: true})
        // console.log("DISPLAYBLANKS::: ", this.state.changeAlphabetClass );
      }


  //NOTE: STEP 2. GAME LOGIC after user input **TWO setState callbacks will be used**
  // User inputs guess - onChange letter is populated in words used
  //timeout function is in place (character restriction is in render)
  //BUG: if user types in word that has been used already then PROMPT user to use another word - use another state for that

  handleGuess = (e) => {
    e.preventDefault()
    let letterInputted = e.currentTarget.value.toLowerCase()
    e.currentTarget.disabled = true
    let passCurrentTarget = e.currentTarget
    console.log(letterInputted);

    this.setState({guess: letterInputted, allGuesses: [...this.state.allGuesses, letterInputted]}, function(){
      this.checkGuess(passCurrentTarget)
    })
    //setTimout clears the form after 1.5secs - note used anymore - not using input field - now using buttons
    // setTimeout(function () {
    //   document.getElementById('wordGuess').value = '';
    // }, 1000);
    
  }


    //CALLBACK FUNCTION 1 OF 2  to check the letter vs the word
    checkGuess = (passCurrentTarget) => {
      let letterInputed = this.state.guess
      // console.log('CHECKGUESS RUNNING!');
      // console.log("-checking state: " + this.state.guess);
      // console.log("-checking letterInput: " + letterInputed);

        //BUG: LEFT OFF HERE - find a way to validate and check for dupe letters, this could be an icebox idea
            // let checkDupesGuesses = () => {
            //   if(this.state.allGuesses.includes(letterInputed)){
            //     alert("You used that letter already, try another one")
            //   }
            // }
            //
            // checkDupesGuesses()

      if(this.state.wrongGuess.includes(letterInputed)){
        alert("letter used already, try another")
      }else if(this.state.hangLetters.includes(letterInputed)){
        this.setState({correctGuess: [...this.state.correctGuess, letterInputed]}, function(){
          this.blanksToWords()
        })
      } else {
        passCurrentTarget.className = 'alphabetClassWrong'
        this.setState({wrongGuess: [...this.state.wrongGuess, letterInputed]}, function(){
          this.checkWin()
        })
      }
    }

          //TURN BLANKS TO WORDS (updates dispalyedWord) -CALLBACK FUNCTION on checkGuess IF (correct) statement
          blanksToWords = () => {
            // console.log("BLANKSTOWORDS -> GETALLINDEXES");
            // console.log("BLANKSTOWORDS START:::");
            let hangLetters = this.state.hangLetters
            let displayedWord = [...this.state.displayedWord] //spread operator makes a copy of this.state.displayedWord
            let letterInputted = this.state.guess

            // console.log("-hangLetters: " + hangLetters);
            // console.log("-displayedWord: " + displayedWord);
            // console.log("-letterInputted: " + letterInputted);


              var indexes = []
              for(let i=0; i < hangLetters.length; i++){
                if(hangLetters[i] === letterInputted){
                  console.log("hangLetters.length: " + hangLetters.length);
                  console.log("i: " + i);
                  console.log("hangLetters: " + hangLetters);
                  console.log("letterInputted: " + letterInputted);
                  indexes.push(i)
                  console.log("indexes: " + indexes);
                }
              }
              console.log(("indexes2: " + indexes));


            console.log("GUESSTOSPLICE: " + indexes);

            indexes.forEach(i => {
              displayedWord.splice(i, 1, letterInputted)
            })

            console.log("Spliced Displayed Word: " + displayedWord);


            this.setState({displayedWord: displayedWord}, function(){
              this.checkWin()
            })
            // console.log("-*State of displayed word: " + this.state.displayedWord);
          }


      //CALLBACK FUNCTION 2 OF 2 to check WIN
      //Hangman has 6 body parts
      checkWin = (e) => {
        // console.log('CHECKWINNN RUNNING!');
        // console.log("-user inputed :" + this.state.guess);
        // console.log("correct guess array: " + this.state.correctGuess);
        // console.log("wrong guess array: " + this.state.wrongGuess);
        console.log("moves left: " + (6-this.state.wrongGuess.length));
        let letterInputted = this.state.guess
        //BUG: make winning === if correct guess equals hangletters

        if(this.state.wrongGuess.length === 6){
          alert(`You LOSE, the correct word was "${this.state.hangWord.toUpperCase()}"`)
        } else if(this.state.displayedWord.includes("_") === false){
          alert("You WIN!")
        }
      }

doNothing = (e) => {
    e.preventDefault()
}

//NOTE: function below tests value returned by alphabet buttons
// clickWorks = (e) => {
//   let save = e.currentTarget.value
//   console.log("ALPHABET STATE::: " + this.state.alphabet);
//   console.log("TARGET ID = " + e.target.id);
//   console.log("TARGET VALUE= " + e.currentTarget.value);
//   console.log("SAVE VARIABLE= " + save);
//   return alert(e.currentTarget.value)
// }




render() {
  // console.log('GAME IS RERENDERING -500');
  let { hangLetters, displayedWord } = this.state //may not need this afterall - replaced it with displayedWord
  // let { displayedWord } = this.state
  // let { alphabet } = this.state
  // console.log("**CHECKING DISPLAYEDWORD:" + displayedWord);

  

  var alphabetClassChanger = this.state.changeAlphabetClass ? 'alphabetClass' : 'alphabetClassWrong'

  var figure = hangFigureSwitch(this.state.wrongGuess.length)

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


    //BUG: DIVS BELOW ARE FOR HANGFIGURE COMPONENTS - THEY DO NOT WORK - SEE COMPONENTS FOR EXPLANATION
  //   <div>
  //   <Hangperson wrongGuess={this.state.wrongGuess}/>
  // </div>


  //   <div>
  //     <HangmanFigure wrongGuess={this.state.wrongGuess}/>
  //   </div>


//   <div className="wrongGuessLetters">
//   <WrongWords wrongGuess={this.state.wrongGuess} />
// </div>


    return (
      <div className="gamePage">

        <img src={figure} className="hangFigure" alt=""/>


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
          RESTART
        </button>
            
        
      </div>
    );
  }
}

export default Game;
