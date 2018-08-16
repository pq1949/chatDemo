import React, { Component } from 'react'
import { Header, Content, Footer } from './components'
import io from 'socket.io-client'
import './App.css';
import { SERVER } from './constant'
import moment from 'moment'
const axios = require('axios')

const { ip, port } = SERVER
const socket = io(`http://${ip}:${port}`)

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      content: []
    }
    this.gap = 0
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount () {

    socket.on('connect', (data) => {
      const message = `connect to http://${ip}:${port} success`
      console.log(message)
      // this.sendMessage(message, 'middle')
    })

    socket.on('message', (data) => {
      console.log(`receive data: ${data}`)
      let content = this.state.content
      content.push({
        type: 'left',
        message: data
      })
      this.setState({
        content
      })
      this.refs.content.scroolToBottom()
    })

    axios.get(`http://${ip}:${port}/init`).then(respose => {
      console.log(respose)
      if (respose.data && !respose.data.error) {
        let content = this.state.content
        respose.data.items.forEach(item => {
          this.gap = 6
          if (++this.gap > 6) {
            content.push({
              type: 'middle',
              message: moment(item.crt_ts).format('YYYY-MM-DD HH:mm')
            })
            this.gap = 1
          }
          content.push({
            type: item.type,
            message: item.content
          })
        })
        this.setState({
          content
        })
        debugger
        this.refs.content.scroolToBottom()
      }
    })
  }

  sendMessage (message, type = 'right') {
    let content = this.state.content
    if (type === 'right' && ++this.gap > 3) {
      content.push({
        type: 'middle',
        message: moment().format('HH:mm')
      })
      this.gap = 1
    }

    if (type === 'right') {
      socket.emit('message', message);
    }

    content.push({
      type,
      message
    })
    this.setState({
      content
    })
    this.refs.content.scroolToBottom()
  }
  render () {
    const { content } = this.state
    return (
      <div className="App">
        <Header />
        <Content ref='content' content={content} />
        <Footer sendMessage={this.sendMessage} />
      </div>
    );
  }
}
