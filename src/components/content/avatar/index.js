import React, { Component } from 'react'
import './index.css'
import cx from 'classnames'
import {AVATAR} from '../../../constant'
const {user, robot} = AVATAR

export default class Avatar extends Component {
  render() {
    const {type = 'left'} = this.props
    let avatar = robot
    if (type === 'right') {
      avatar = user
    }
    return (
          <img className={cx({'image-left': type === 'left', 'image-right': type === 'right'})} src={avatar} alt=""/>
    )
  }
}
