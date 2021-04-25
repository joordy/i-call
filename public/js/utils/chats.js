// If there are two messages in a row from the same user, this code
// will remove the name and time from the previous message.
export function checkLastMessage(chatList) {
  const chatArr = chatList.childNodes
  let lastElem = chatArr[chatArr.length - 1]
  let secLastElem = chatArr[chatArr.length - 2]

  if (chatArr.length >= 3) {
    const lastMsg = lastElem.childNodes[1].innerText
    const msgBefore = secLastElem.childNodes[1].innerText
    if (lastMsg === msgBefore) {
      secLastElem.style.margin = 0
      secLastElem.style.paddingBottom = 0
      secLastElem.style.paddingTop = 0
      lastElem.style.paddingTop = 0
      secLastElem.removeChild(secLastElem.childNodes[1])
      secLastElem.removeChild(secLastElem.childNodes[1])
    }
  }
}

// Function which creates a list item of a chat message
// including message, sender and time.
export function createChatElement(message) {
  const listElem = document.createElement('li')
  const sendElem = document.createElement('p')
  const timeElem = document.createElement('p')
  const msgElem = document.createElement('p')

  sendElem.setAttribute('id', 'sender')
  timeElem.setAttribute('id', 'time')

  const sender = document.createTextNode(message.text.user)
  const time = document.createTextNode(message.time)
  const msg = document.createTextNode(message.text.message)

  sendElem.appendChild(sender)
  timeElem.appendChild(time)
  msgElem.appendChild(msg)

  listElem.appendChild(msgElem)
  listElem.appendChild(sendElem)
  listElem.appendChild(timeElem)

  return listElem
}
