const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const axios = require('axios')
const mysql = require('mysql')
const mysqlClient = mysql.createConnection({
  host: '140.143.99.193',
  port: '3306',
  user: 'testuser',
  database: 'testdb',
  password: '123456'
});


mysqlClient.connect(function (err) {
  if (err) {
    console.error('mysql error connecting: ' + err.stack);
    return;
  }
  console.log('mysql connected as id ' + mysqlClient.threadId);
})

// 跨越
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  if(req.method=="OPTIONS") res.send(200);
  else  next();
})

// app.get('/', function (req, res) {
//   res.send('<h1>Hello world</h1>');
// })

app.get('/init', function (req, res) {
  // res.send('<h1>Hello world</h1>');
  mysqlClient.query(`SELECT * FROM messages order by customer_id desc limit 100; `, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({
        error: true,
        items:[]
      })
    } else {
      res.send({
        error: false,
        items: results.sort((a,b) => Number(a.customer_id) - Number(b.customer_id))
      })
    }
    console.log('results.length ' + results.length)
  });
})

// 静态文件
app.use(express.static('../build'))

io.on('connection', function (socket) {
  console.log('a user connected');

  socket.on('message', function (data) {
    console.log(`user message: ${data}`)
    axios.post('http://www.tuling123.com/openapi/api', {
      'key': '2a138e0688b54450ac7561e6f86a16ea',
      'info': data,
      "userid": '123456'
    }).then(response => {
      const resData = response.data.text
      console.log(response.data)
      socket.emit('message', resData)
      mysqlClient.query(`INSERT INTO messages (content, type) VALUES ('${data}', 'right'),('${resData}','left') `, function (error, results, fields) {
        if (error) console.log(error)
        console.log(results)
      });
    })
      .catch(error => {
        console.log(`error ${error.response && error.response.status}`)
        const errInfo = '困了~~~'
        socket.emit('message', errInfo);
        mysqlClient.query(`INSERT INTO messages (content, type) VALUES ('${data}', 'right'),('${errInfo}','left') `, function (error, results, fields) {
          if (error) console.log(error)
          console.log(results)
        });
      })
  })
})

http.listen(3001, function () {
  console.log('listening on *:' + 3001);
})
