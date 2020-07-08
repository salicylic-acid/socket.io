'use strict'
const chatForm     = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const inputField   = document.getElementById('msg')

const socket = io()

socket.on('message', msg => {
  outputMessage(msg)

  chatMessages.scrollTop = chatMessages.scrollHeight

  inputField.value = ''
  inputField.focus()
})

chatForm.addEventListener('submit', e => {
  e.preventDefault()
  const msg = e.target.elements.msg.value

  socket.emit('chatMessage', msg)
})

function outputMessage(message) {
  const div = document.createElement('div')
  div.classList.add('message')

  console.log(message)

  const text = `
    <p class="meta">${message.user} <span>${message.time}</span></p>
    <p class="text">${message.text} ${message.time}</p>
    `

  div.innerHTML = text

  document.querySelector('.chat-messages').appendChild(div)
}
