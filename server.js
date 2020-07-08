const path     = require('path')
const http     = require('http')
const express  = require('express')
const socketio = require('socket.io')

const app      = express()
const server   = http.createServer(app)
const io       = socketio(server)

const PORT     = process.env.PORT || 3000

const formatMessage = require('./utils/formatMessage')
const botName       = "Chat Bot"

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {

 socket.emit('message', formatMessage(botName, `Hello World.↵Welcome to Hell. It's currently` ))

 socket.broadcast.emit('message', 'a user has joined the chat')

 socket.on('disconnect', () => io.emit('message', 'a user has left the chat'))

 socket.on('chatMessage', msg => io.emit('message', msg))

//end
})

server.listen(PORT, () => console.log(`Sever running on port: ${PORT}`))
