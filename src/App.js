import React, { Component } from 'react'
import {Header, Content, Footer} from './components'
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: [{
        type:'left',
        message:'welcome!!'
      }]
    }
    this.sendMessage = this.sendMessage.bind(this)
  }

  sendMessage(value) {
    let content = this.state.content
    content.push({
      type:'right',
      message: value
    })
    this.setState({
      content
    })
  }
  render() {
    debugger
    const {content} = this.state
    return (
      <div className="App">
        <Header />
        <Content content={content} />
        <Footer sendMessage={this.sendMessage}/>
      </div>
    );
  }
}
