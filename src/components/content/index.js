import React, { Component } from 'react';
import Message from './message'
import './index.css'

export default class Content extends Component {
  render() {
    return (
      <div className="content">
      <Message />
      <Message />
      </div>
    )
  }
}
