import React, { Component } from 'react';
import './index.css'

export default class Footer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      inputValue: ''
    }
    this.onValueChange = this.onValueChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.submitUserMessage = this.submitUserMessage.bind(this)
    this.onClick=this.onClick.bind(this)
  }

  onClick() {
    this.submitUserMessage()
  }
  onValueChange(event) {
    this.setState({ inputValue: event.target.value });
  }
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.submitUserMessage()
    }
  }
  submitUserMessage() {
    const {inputValue} = this.state
    if (inputValue === '') return
    this.props.sendMessage && this.props.sendMessage(inputValue)
    this.setState({
      inputValue:''
    })
  }
  render() {
    const {inputValue} = this.state
    return (
      <div className="footer">
        <input
         className='input'
         type="textarea"
         onKeyPress={this.handleKeyPress}
         onChange={this.onValueChange}
         value={inputValue}
         placeholder="Type the message ..."/>
        <button className='button' onClick={this.onClick}>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 500 500"><g><g><polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75"></polygon></g></g></svg>
        </button>
      </div>
    )
  }
}
