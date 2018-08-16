import React, { Component } from 'react'
import './index.css'
import cx from 'classnames'

export default class Message extends Component {

  render() {
    const {type = 'left', message} = this.props
    return (
        <div className={cx({'message-left': type === 'left', 'message-right': type === 'right', 'message-middle': type === 'middle'})}>
            {message}
        </div>
    )
  }
}
