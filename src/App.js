import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import IntroPage from './components/IntroPage'
import Game from './components/Game'


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
            <div>
              <Route path ="/game" component={Game} />
              <Route exact path="/" component={IntroPage} />
            </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
