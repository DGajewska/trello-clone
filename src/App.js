import React, { Component } from "react";
import {hot} from "react-hot-loader";
import Banner from './Banner';
import Board from './Board';

const testData = {
  name: 'My Test Board',
  lists: [{
    title: 'My first list'
  }]
}

class App extends Component{
  render(){
    return(
      <div id="app">
        <Banner />
        <Board board={testData}/>
      </div>
    );
  }
}

export default hot(module)(App);