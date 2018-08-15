import React, { Component } from 'react'
import './message.css'

// http://tvax3.sinaimg.cn/crop.0.0.1590.1590.50/005EfzLfly8ftnbt8gke5j3186186qv6.jpg
export default class Content extends Component {
  render() {
    return (
      <div className="message">
        <div className='avatar'>
          <img src="https://tvax4.sinaimg.cn/crop.0.0.512.512.180/4c35efacly8ftbzlhorbpj20e80e83yw.jpg" alt=""/>
        </div>
        <div className='content'>
            message
        </div>
      </div>
    )
  }
}
