import React, { Component } from 'react';
import Item from './item'
import './index.css'

export default class Content extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: ''
    }
  }
  render() {
    const {content} = this.props
    debugger
    return (
      <div className="content">
      {
        content.map((item, index) => <Item key={index} type={item.type} message={item.message} />)
      }
      </div>
    )
  }
}
