import React, { Component } from 'react';

class PlayerInput extends Component {

  render() {

    return (
      <div>
        <form>
          <label>
            Type in a word:
            <input type="text" name="wordguess"/>
          </label>
        </form>
      </div>
    );
  }
}

export default PlayerInput;
