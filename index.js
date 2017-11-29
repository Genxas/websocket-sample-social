const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

var users = []

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/users', (req, res) => {
    res.send(users)
})

io.on('connection', (socket) => {
    socket.on('connected', (data) => {
        if (data.userId) {
            users.push(data)
        }
    })

    socket.on('postFeed', (data) => {
        io.sockets.emit('newFeed', data)
    })
})

http.listen(3000, () => {
    console.log('Socket is ready')
})
