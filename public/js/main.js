const chatForm     = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const userList     = document.getElementById('users')
const roomName     = document.getElementById('room-name')
const inputField   = document.getElementById('msg')

const {username, room} = Qs.parse(location.search,{
    ignoreQueryPrefix:true
})

const socket = io()

socket.emit('joinRoom', {username, room})

socket.on('message', msg => {
  outputMessage(msg)

  chatMessages.scrollTop = chatMessages.scrollHeight
})

socket.on('roomUsers', ({room, users}) => {
  outputRoom(room)
  outputUsers(users)
})

chatForm.addEventListener('submit', e => {
  e.preventDefault()
  const msg = e.target.elements.msg.value

  socket.emit('chatMessage', msg)

  e.target.elements.msg = ''
  e.target.elements.msg.focus()
})

function outputMessage(message) {
  const div = document.createElement('div')
  div.classList.add('message')

  const text = `
    <p class="meta">${message.user} <span>${message.time}</span></p>
    <p class="text">${message.text}</p>
    `
  div.innerHTML = text

  document.querySelector('.chat-messages').appendChild(div)
}

function outputRoom(room){
  roomName.innerHTML = room
}

function outputUsers(users) {
  userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
  `;
}
