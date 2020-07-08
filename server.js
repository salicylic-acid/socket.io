const path     = require('path')
const http     = require('http')
const express  = require('express')
const socketio = require('socket.io')
const moment   = require('moment')

const app      = express()
const server   = http.createServer(app)
const io       = socketio(server)

const PORT     = process.env.PORT || 3000
const botName  = "Admin"

const formatMessage   = require('./utils/messages')
const {userJoin,
       getCurrentUser,
       userLeave }    = require('./utils/users')

// Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Client connects to socket
io.on('connection', socket => {

  socket.on('joinRoom', ({username, room}) => {
      const user = userJoin(socket.id, username, room)

      socket.join(user.room)

      socket.emit('message', formatMessage(botName, `Hello World. It's currently ${moment().format('h:mm a')}`))

      socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`))
  })


 socket.on('chatMessage', msg => {
   const user = getCurrentUser(socket.id)
   io.emit('message', formatMessage(user.username, msg))
 })

 socket.on('disconnect', () => {
    const user = userLeave(socket.id)
    console.log(user, "user being logged")

   io.emit('message', `X has left the chat`)
 })

//end
})

server.listen(PORT, () => console.log(`Sever running on port: ${PORT}`))
