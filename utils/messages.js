const moment = require('moment')

function formatMessage(user, text) {
  console.log(text)
  return {
    user,
    text,
    time: moment().format('h:mm a')
  }
}

module.exports = formatMessage
