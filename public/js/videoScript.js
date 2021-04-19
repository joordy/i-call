const socket = io('/')
const roomID = document.querySelector('#roomID').textContent
const videoGridContainer = document.querySelector('.videoGrid')
const userVideo = document.createElement('video')
const chatForm = document.querySelector('#form')
const chatMsg = document.querySelector('#chatMsg')
const chatMessages = document.querySelector('#chatMessages')
const myUserName = document.querySelector('#userName').innerHTML
console.log(myUserName)

userVideo.muted = true
let myVideoStream

let browserUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia
let peerConnection = new Peer(undefined, {
  path: '/peerjs',
  host: '/',
  port: '3232', // Development Port
  // port: '443', // Heroku Port
})

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    myVideoStream = stream
    addNewUserVideoStream(userVideo, stream)

    peerConnection.on('call', (answerCall) => {
      const video = document.createElement('video')
      answerCall.answer(stream)
      answerCall.on('stream', (newUserStream) => {
        addNewUserVideoStream(video, newUserStream)
      })
    })

    socket.on('user-connected', (userID) => {
      newUserConnected(userID, stream)
    })

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault()
      if (chatMsg.value != '') {
        socket.emit('message', {
          message: chatMsg.value,
          user: myUserName,
          room_ID: roomID,
        })
        chatMsg.value = ''
      }
    })

    socket.on('createMessage', (message) => {
      console.log(
        `this is your message: ${message.text.user}, ${message.text.message} and ${message.time}`
      )

      const chatList = document.querySelector('.chatMessages')
      const chatElem = createChatElement(message)

      chatList.appendChild(chatElem)
      chatList.scrollTop = chatList.scrollHeight

      if (message.text.user === myUserName) {
        console.log('yourself')
        chatElem.setAttribute('class', 'ownMessage')
      }

      checklastMessage(chatList)
    })
    videoEvents()
  })

peerConnection.on('call', (answerCall) => {
  browserUserMedia(
    { video: true, audio: true },
    function (stream) {
      const video = document.createElement('video')
      answerCall.answer(stream)
      answerCall.on('stream', function (remoteStream) {
        addNewUserVideoStream(video, remoteStream)
      })
    },
    function (err) {
      console.log('Failed to get local stream', err)
    }
  )
})

peerConnection.on('open', (id) => {
  console.log('roomID', roomID)
  socket.emit('join-room', {
    room_ID: roomID,
    peer_ID: id,
    userName: myUserName,
  })
})

function newUserConnected(userID, streams) {
  console.log('new user connected')
  const callUser = peerConnection.call(userID, streams)
  const video = document.createElement('video')
  callUser.on('stream', (newUserStream) => {
    console.log(newUserStream)
    addNewUserVideoStream(video, newUserStream)
  })
}

function addNewUserVideoStream(videoElement, stream) {
  videoElement.srcObject = stream
  videoElement.addEventListener('loadedmetadata', () => {
    videoElement.play()
  })
  videoGridContainer.append(videoElement)
}

function videoEvents() {
  const muteMyself = document.querySelector('#muteMyself')
  const stopVideo = document.querySelector('#stopVideo')
  const endCall = document.querySelector('#endCall')
  const inviteUser = document.querySelector('#inviteUser')
  const openChat = document.querySelector('#openChat')
  const copyBtn = document.querySelector('#copyRoomID')

  muteMyself.addEventListener('click', (e) => {
    let userAudioEnabled = myVideoStream.getAudioTracks()[0].enabled
    muteMyself.classList.toggle('activeMenuItem')
    if (!userAudioEnabled) {
      myVideoStream.getAudioTracks()[0].enabled = true
      // muteMyself.textContent = 'Mute'
    } else {
      myVideoStream.getAudioTracks()[0].enabled = false
      // muteMyself.textContent = 'Unmute'
    }
  })

  stopVideo.addEventListener('click', (e) => {
    let userVidEnabled = myVideoStream.getVideoTracks()[0].enabled
    console.log('Hey jou heb ik nodig', myVideoStream.getVideoTracks()[0])
    stopVideo.classList.toggle('activeMenuItem')

    if (!userVidEnabled) {
      myVideoStream.getVideoTracks()[0].enabled = true
      // stopVideo.innerHTML = 'Stop Video'
    } else {
      myVideoStream.getVideoTracks()[0].enabled = false
      // stopVideo.textContent = 'Play Video'
    }
  })

  endCall.addEventListener('click', (e) => {
    console.log('C')
    console.log(endCall)
  })

  inviteUser.addEventListener('click', (e) => {
    const invitePopUp = document.querySelector('.invitePopUp')
    const invitationID = document.querySelector('#invitationID')
    inviteUser.classList.toggle('activeMenuItem')
    invitePopUp.classList.toggle('activePopup')
    invitationID.value = roomID
  })

  openChat.addEventListener('click', (e) => {
    const chat = document.querySelector('.chatGrid')
    openChat.classList.toggle('activeMenuItem')
    chat.classList.toggle('active')
    videoGridContainer.classList.toggle('active')
  })

  copyBtn.addEventListener('click', (e) => {
    const invitePopUp = document.querySelector('.invitePopUp')
    const invitationID = document.querySelector('#invitationID')
    const inputEl = document.createElement('input')
    document.body.appendChild(inputEl)
    inputEl.value = invitationID.value
    inputEl.select()
    document.execCommand('copy', false)
    inputEl.remove()
    setTimeout(() => {
      invitePopUp.classList.remove('activePopup')
      inviteUser.classList.remove('activeMenuItem')
    }, 500)
  })
}

function checklastMessage(chatList) {
  const arr = chatList.childNodes

  if (arr.length > 1) {
    const secondLastElem = arr[arr.length - 2]
    return secondLastElem
  }
  // const secondLastElem = arr[arr.length - 2]
  const lastElem = arr[arr.length - 1]

  const secLastElemChild = secondLastElem.childNodes
  const lastElemChild = lastElem.childNodes

  console.log(lastElemChild[1].innerHTML)
  console.log(secLastElemChild[1].innerHTML)
  if (lastElemChild[1].innerHTML === secLastElemChild[1].innerHTML) {
    console.log(true)
  } else if (secLastElemChild[1].innerHTML === undefined) {
    console.log('first message')
  } else if (lastElemChild[1].innerHTML != secLastElemChild[1].innerHTML) {
    console.log('else')
  }
  console.log(lastElemChild)
}

function createChatElement(message) {
  const listElem = document.createElement('li')
  const sendElem = document.createElement('p')
  const timeElem = document.createElement('p')
  const msgElem = document.createElement('p')

  sendElem.setAttribute('id', 'sender')

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
