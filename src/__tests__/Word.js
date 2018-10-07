import React from 'react';
// import ReactDOM from 'react-dom';
import Word from '../components/Word.js';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('Renders the word', ()=>{
  const word = mount(<Word />)
  expect(app.find('h2').text()).toEqual('Welcome to LEARN')
})
