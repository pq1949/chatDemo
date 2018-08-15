import React, { Component } from 'react'
import './index.css'
import Message from '../message'
import Avatar from  '../avatar'

export default class Item extends Component {
  render() {
    const {type = 'left', message, avatar} = this.props
    let item = <div className='item-left'>
                  <Avatar type={type} avatar={avatar} />
                  <Message type={type} message={message} />
              </div>
    if (type === 'right') {
      item = <div className='item-right'>
                <Message type={type} message={message} />
                <Avatar type={type} avatar={avatar} />
            </div>
    }
    return item
  }
}
