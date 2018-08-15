import React, { Component } from 'react'
import {Header, Content, Footer} from './components'
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Content />
        <Footer />
      </div>
    );
  }
}
