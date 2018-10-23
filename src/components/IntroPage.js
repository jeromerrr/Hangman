import React, { Component } from 'react';
import './styling.css'


class IntroPage extends Component {

  render() {

    return (
      <div className="introPage">
      
        <div className="introBackgroundImage"></div>
    
        <h1 className="introTitle">
          HANGPERSON
        </h1>

        <h5 className="introSubtitle">
          Do you want to play a game?...
        </h5>

        <a href="/game">
          <button className="introButton"> 
            START 
          </button>
        </a>

      </div>
    );
  }
}

export default IntroPage;
