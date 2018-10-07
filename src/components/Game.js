import React, { Component } from 'react';
import './styling.css'
import Letter from './Letter'
import WrongWords from './WrongWords'
import HangmanFigure from './HangmanFigure'
import Alphabet from './Alphabet'

class Game extends Component {
  constructor(props){
    super(props)
    this.state = {
      guess: "",
      hangWord: "",
      hangLetters: [],
      correctGuess: [],
      wrongGuess: [],
      allGuesses: [],
      displayedWord: [],
      alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
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
    let wordArray = ["cat", "dog", "mouse", "bear", "monkey", "rhino", "triceratops"]
    let singleWord = wordArray[Math.floor(Math.random() * wordArray.length)]
    let splitLetters = singleWord.split("")
    console.log("RANDOM WORD: " + splitLetters);
    this.setState({hangWord: singleWord, hangLetters: splitLetters, guess: "", correctGuess: [], wrongGuess: [], allGuesses: []}, function(){
      this.displayBlanks()
    })
  }
    //TURN LETTERS INTO BLANKS - CALLBACK FUNCTION
      displayBlanks = () => {
        console.log("displayBlanks START:::");
        let hangLetters = this.state.hangLetters
        let blanks = this.state.hangLetters.map(letter => {
          return "_"
        })
        console.log("Here are the blanks: " + blanks);
        this.setState({displayedWord: blanks})
      }


  //NOTE: STEP 2. GAME LOGIC after user input **TWO setState callbacks will be used**
  // User inputs guess - onChange letter is populated in words used
  //timeout function is in place (character restriction is in render)
  //BUG: if user types in word that has been used already then PROMPT user to use another word - use another state for that

  handleGuess = (e) => {
    let letterInputted = e.currentTarget.value.toLowerCase()
    this.setState({guess: letterInputted, allGuesses: [...this.state.allGuesses, letterInputted]}, function(){
      this.checkGuess()
    })
    //setTimout clears the form after 1.5secs
    setTimeout(function () {
      document.getElementById('wordGuess').value = '';
    }, 1000);
  }


    //CALLBACK FUNCTION 1 OF 2  to check the letter vs the word
    checkGuess = () => {
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

      if(this.state.hangLetters.includes(letterInputed)){
        this.setState({correctGuess: [...this.state.correctGuess, letterInputed]}, function(){
          this.blanksToWords()
        })
        // console.log("correctGuess= " + this.state.correctGuess);
        // alert("YASSS")
      } else {
        this.setState({wrongGuess: [...this.state.wrongGuess, letterInputed]}, function(){
          this.checkWin()
        })
        // console.log("wrongGuess= " + this.state.wrongGuess);
        // alert("NAH BEE")
      }
    }
          // //OLD FUNCTION - NOT USED
          // blanksToWordsOLD = () => {
          //   // console.log("BLANKSTOWORDS START:::");
          //   let hangLetters = this.state.hangLetters
          //   let displayedWord = [...this.state.displayedWord] //spread operator makes a copy of this.state.displayedWord
          //   let letterInputted = this.state.guess
          //
          //   // console.log("-hangLetters: " + hangLetters);
          //   // console.log("-displayedWord: " + displayedWord);
          //   // console.log("-letterInputted: " + letterInputted);
          //
          //   let guessToSplice = hangLetters.indexOf(letterInputted) //should log a number ex. 2
          //   // console.log("-guessToSplice: " + guessToSplice);
          //   // console.log("displayedWord before splicing: " + displayedWord);
          //   displayedWord.splice(guessToSplice, 1, letterInputted) //mutates the copy of this.state.displayedWords
          //   // console.log("-splicedGuess: " + splicedGuess);
          //
          //   this.setState({displayedWord: displayedWord}, function(){
          //     this.checkWin()
          //   })
          //   // console.log("-*State of displayed word: " + this.state.displayedWord);
          // }

          //TURN BLANKS TO WORDS (updates dispalyedWord) -CALLBACK FUNCTION on checkGuess IF (correct) statement
          blanksToWords = () => {
            console.log("BLANKSTOWORDS -> GETALLINDEXES");
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
        // console.log("moves left: " + (6-this.state.wrongGuess.length));
        let letterInputted = this.state.guess
        //BUG: make winning === if correct guess equals hangletters

        if(this.state.wrongGuess.length === 6){
          alert(`You LOSE, the correct word was "${this.state.hangWord.toUpperCase()}"`)
        } else if(this.state.displayedWord.includes("_") === false){
          alert("You WIN!")
        }
      }

        //OLD WAY OF CHECKING WIN BY ARRAY LENGTH: if((this.state.correctGuess.includes(this.state.hangLetters.toString)) === true) {
        // // if(this.state.correctGuess.includes === this.state.hangLetters.length){
        //
        //   alert("You WIN!")
        // } else if(this.state.wrongGuess.length === 6){
        //   alert("You LOSE")
        // }
        // console.log("-All guesses (end): " + this.state.allGuesses);

//EXAMPLE OF A SETSTATE CALLBACK FUNCTION
//Sets State, then calls another function - good way to ensure state is set correctly and then links other functions chronologically
// changeTitle: function changeTitle (event) {
//   this.setState({ title: event.target.value }, function() {
//     this.validateTitle();
//   });
//
// },
// validateTitle: function validateTitle () {
//   if (this.state.title.length === 0) {
//     this.setState({ titleError: "Title can't be blank" });
//   }
// },

doNothing = (e) => {
    e.preventDefault()
}

//BUG: THIS IS JUST TO TEST THE ALPHABET PASSING E.TARGET.VALUE BEFORE LINKING IT WITH HANDLEGUESS
clickWorks = (e) => {
  let save = e.currentTarget.value
  console.log("ALPHABET STATE::: " + this.state.alphabet);
  console.log("TARGET ID = " + e.target.id);
  console.log("TARGET VALUE= " + e.currentTarget.value);
  console.log("SAVE VARIABLE= " + save);
  return alert(e.currentTarget.value)
}

// renderEachAlphabetLetter = () => {
//   this.state.alphabet.map(eachAlphabetLetter => {
//   console.log(`${eachAlphabetLetter}`);
//   return(
//     <button value={eachAlphabetLetter} id={eachAlphabetLetter} onClick={this.clickWorks}>
//       <p> {eachAlphabetLetter}</p>
//     </button>
//     )
//   })
// }

render() {
  console.log('GAME IS RERENDERING -500');
  let { hangLetters, displayedWord } = this.state //may not need this afterall - replaced it with displayedWord
  // let { displayedWord } = this.state
  // let { alphabet } = this.state
  console.log("**CHECKING DISPLAYEDWORD:" + displayedWord);

    return (
      <div className="introPage">


        <div>
          <HangmanFigure wrongGuess={this.state.wrongGuess}/>
        </div>

        <div id="letters-container">
          {displayedWord.map(eachLetter => {
              return (
                <Letter eachLetter = {eachLetter}/>
              )
          })}
        </div>

          <form className="userInput" onChange={this.handleGuess} onSubmit={this.doNothing}>
            <label>
              Type in a letter:
              <br/>
              <div class="textInputWrap">
                <input type="text" id="wordGuess" maxLength="1" placeholder="..."/>
              </div>
            </label>
          </form>


            <div>
              {this.state.alphabet.map(eachAlphabetLetter => {
              console.log(`${eachAlphabetLetter}`);
              return(
                <button value={eachAlphabetLetter} id={eachAlphabetLetter} onClick={this.handleGuess}>
                  <p>{console.log("HELLO::: " + eachAlphabetLetter)} {eachAlphabetLetter}</p>
                </button>
                )
              })}
            </div>


          <div>
            <WrongWords wrongGuess={this.state.wrongGuess} />
          </div>

        <button className="introButton" onClick={this.setHangWord} >
          RESTART
        </button>



      </div>
    );
  }
}

export default Game;
