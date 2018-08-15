import React, { Component } from 'react';
import Item from './item'
import './index.css'
import { Scrollbars } from 'react-custom-scrollbars'

export default class Content extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: ''
    }
    this.update = this.update.bind(this)
  }
  update() {
    setTimeout(() => {
      this.refs.scrollbars && this.refs.scrollbars.scrollToBottom()
    },0)
  }
  render() {
    const {content} = this.props
    return (
      <div className="content">
      <Scrollbars
      ref='scrollbars'
      autoHide
      onUpdate={this.update}
      autoHideTimeout={1000}
      autoHideDuration={200}>
      {
        content.map((item, index) => <Item key={index} type={item.type} message={item.message} />)
      }
      </Scrollbars>
      </div>
    )
  }
}
