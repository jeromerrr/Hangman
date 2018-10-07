import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styling.css'

class IntroPage extends Component {

  render() {

    return (
      <div className="introPage">

      <h1 class="introTitle">
        HANGPERSON
      </h1>
      <h5 class="introSubtitle">
        6 TRIES IS ALL YOU GET...
      </h5>

      <a href="/game"><button className="introButton"> START </button></a>

      </div>
    );
  }
}

export default IntroPage;
