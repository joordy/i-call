const socket = io('/')
const roomID = document.querySelector('#roomID').textContent
const videoGridContainer = document.querySelector('.videoGrid')
const userVideo = document.createElement('video')
const chatForm = document.querySelector('#form')
const chatMsg = document.querySelector('#chatMsg')
const chatMessages = document.querySelector('#chatMessages')
const myUserName = document.querySelector('#userName').innerHTML

userVideo.muted = true
let myVideoStream
let peers = {}

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
    console.log(myVideoStream)
    addNewUserVideoStream(userVideo, stream)

    peerConnection.on('call', (answerCall) => {
      const video = document.createElement('video')
      answerCall.answer(stream)
      answerCall.on('stream', (newUserStream) => {
        addNewUserVideoStream(video, newUserStream)
      })
    })

    // When new user will connect, it fires the NewUserConnected function on line 124
    socket.on('user-connected', (userID) => {
      newUserConnected(userID, stream)
    })

    // socket.on('user-disconnected', (userID) => {
    //   peerConnection.disconnect()
    //   // newUserConnected(userID, stream)
    // })

    // Prevents form for submitting, and creates a object which will be sended to
    // the server. The server will send it back to the client.
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

    // The received information of the server will be added to the 'Chat Messages' box,
    // the window will be automatically scrolled down, and the 'CreateChatElement' and 'CheckLastMessage'
    // will style the elements in HTML.
    socket.on('createMessage', (message) => {
      console.log(
        `${message.text.user}, ${message.text.message} & ${message.time}`
      )

      const chatList = document.querySelector('.chatMessages')
      const chatElem = createChatElement(message)
      chatList.appendChild(chatElem)
      chatList.scrollTop = chatList.scrollHeight

      if (message.text.user === myUserName) {
        chatElem.setAttribute('class', 'ownMessage')
      }
      checkLastMessage(chatList)
    })

    socket.on('disconnected', (roomID, userID) => {
      console.log('user disconnected')
      // if (peers[userID]) peers[userID].close()
    })
    videoEvents()
  })

// Call connection of PeerJS, answers the call by opening the video src of the user.
peerConnection.on('call', (answerCall) => {
  browserUserMedia(
    { video: true, audio: true },
    function (stream) {
      const video = document.createElement('video')
      answerCall.answer(stream)
      answerCall.on('stream', function (remoteStream) {
        addNewUserVideoStream(video, remoteStream)
      })
      answerCall.on('close', function () {
        video.remove()
      })
    },
    function (err) {
      console.log('Failed to get local stream', err)
    }
  )
})

// Opens connection of PeerJS, and sends roomID, peerID and userName to server.
peerConnection.on('open', (id) => {
  console.log('roomID', roomID)
  socket.emit('join-room', {
    room_ID: roomID,
    peer_ID: id,
    userName: myUserName,
  })
})

// Function which adds the video connection using 'call' from PeerJS, adds video of new user to the app.
function newUserConnected(userID, streams) {
  console.log('new user connected')
  const callUser = peerConnection.call(userID, streams)
  const video = document.createElement('video')
  callUser.on('stream', (newUserStream) => {
    console.log(newUserStream)
    addNewUserVideoStream(video, newUserStream)
  })
  callUser.on('close', () => {
    video.remove()
  })
  peers[userID] = callUser

  // peers[userID] = callUser
}

// Add stream to video source
function addNewUserVideoStream(videoElement, stream) {
  videoElement.srcObject = stream
  videoElement.addEventListener('loadedmetadata', () => {
    videoElement.play()
  })
  videoGridContainer.append(videoElement)
}

// All event listeners of the 5 options in the video-screen
function videoEvents() {
  const muteMyself = document.querySelector('#muteMyself')
  const stopVideo = document.querySelector('#stopVideo')
  const endCall = document.querySelector('#endCall')
  const inviteUser = document.querySelector('#inviteUser')
  const openChat = document.querySelector('#openChat')
  const copyBtn = document.querySelector('#copyRoomID')

  // Mute microphone of yourself, replacing SVG's when muted and unmuted.
  muteMyself.addEventListener('click', (e) => {
    let userAudioEnabled = myVideoStream.getAudioTracks()[0].enabled
    muteMyself.classList.toggle('activeMenuItem')
    if (!userAudioEnabled) {
      muteMyself.innerHTML = `<svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.201 16.8076C12.8454 16.8076 14.9959 14.657 14.9959 12.0126V4.82014C14.9959 2.16253 12.8562 0 10.2261 0C10.1418 0.000506953 10.0577 0.0105604 9.97561 0.0299685C8.7448 0.0896422 7.58403 0.620174 6.73347 1.51179C5.8829 2.40342 5.40764 3.58789 5.40601 4.82014V12.0126C5.40601 14.657 7.55655 16.8076 10.201 16.8076Z" fill="#EEEEEF"/>
        <path d="M9.00215 21.5198V24H11.3996V21.5198C16.1215 20.9264 19.7908 16.895 19.7908 12.0126H17.3933C17.3933 15.9792 14.1675 19.205 10.2009 19.205C6.23426 19.205 3.00845 15.9792 3.00845 12.0126H0.610962C0.610962 16.8938 4.28031 20.9264 9.00215 21.5198Z" fill="#EEEEEF"/>
        </svg>`
      myVideoStream.getAudioTracks()[0].enabled = true
    } else {
      muteMyself.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.2724 21.9537L19.1966 17.878C20.5103 16.205 21.2249 14.1397 21.2261 12.0126H18.8286C18.8274 13.5042 18.3583 14.9578 17.4872 16.1686L15.7503 14.4304C16.1921 13.7011 16.4274 12.8653 16.4311 12.0126V4.82014C16.4311 2.16253 14.2914 0 11.6614 0C11.5774 0 11.4935 0.0107886 11.4108 0.0299685C10.18 0.0896422 9.01924 0.620174 8.16868 1.51179C7.31811 2.40342 6.84285 3.58789 6.84122 4.82014V5.5226L1.69502 0.376405L0 2.07143L21.5773 23.6488L23.2724 21.9537ZM4.44373 12.0126H2.04625C2.04625 16.8939 5.7144 20.9264 10.4374 21.5198V24H12.8349V21.5198C13.7626 21.4015 14.6678 21.147 15.5213 20.7646L13.6645 18.9089C13.006 19.1042 12.323 19.204 11.6362 19.205C7.66955 19.205 4.44373 15.9792 4.44373 12.0126Z" fill="#EEEEEF"/>
        <path d="M6.84973 12.093C6.87129 13.3344 7.37405 14.519 8.25202 15.3969C9.12998 16.2749 10.3145 16.7777 11.556 16.7992L6.84973 12.093Z" fill="#EEEEEF"/>
        </svg>`
      myVideoStream.getAudioTracks()[0].enabled = false
    }
  })

  // Stops video of yourself, replacing SVG's when paused and started.
  stopVideo.addEventListener('click', (e) => {
    let userVidEnabled = myVideoStream.getVideoTracks()[0].enabled
    console.log('Hey jou heb ik nodig', myVideoStream.getVideoTracks()[0])
    stopVideo.classList.toggle('activeMenuItem')

    if (!userVidEnabled) {
      stopVideo.innerHTML = `<svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0 3C0 2.20435 0.316071 1.44129 0.87868 0.87868C1.44129 0.31607 2.20435 2.07768e-08 3 2.07768e-08H14.25C14.9776 -8.5572e-05 15.6805 0.264289 16.2277 0.743892C16.7749 1.22349 17.1292 1.88563 17.2245 2.607L21.8895 0.534C22.1178 0.432257 22.368 0.389195 22.6172 0.408728C22.8664 0.428261 23.1068 0.509769 23.3165 0.645844C23.5262 0.781918 23.6986 0.968244 23.8179 1.18789C23.9373 1.40753 23.9999 1.65352 24 1.9035V13.0965C23.9998 13.3463 23.9372 13.5921 23.8179 13.8115C23.6986 14.031 23.5264 14.2172 23.3169 14.3532C23.1074 14.4893 22.8673 14.5708 22.6183 14.5905C22.3693 14.6102 22.1193 14.5674 21.891 14.466L17.2245 12.393C17.1292 13.1144 16.7749 13.7765 16.2277 14.2561C15.6805 14.7357 14.9776 15.0001 14.25 15H3C2.20435 15 1.44129 14.6839 0.87868 14.1213C0.316071 13.5587 0 12.7956 0 12V3Z" fill="#EEEEEF"/>
      </svg>`
      myVideoStream.getVideoTracks()[0].enabled = true
    } else {
      stopVideo.innerHTML = `<svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4415 17.4825C16.8693 17.0266 17.1432 16.4479 17.2245 15.828L21.8895 17.901C22.1178 18.0027 22.368 18.0458 22.6172 18.0263C22.8664 18.0067 23.1068 17.9252 23.3165 17.7892C23.5262 17.6531 23.6986 17.4668 23.8179 17.2471C23.9373 17.0275 23.9999 16.7815 24 16.5315V5.3385C23.9998 5.08871 23.9372 4.84294 23.8179 4.62347C23.6986 4.40401 23.5264 4.21781 23.3169 4.08178C23.1074 3.94574 22.8673 3.86417 22.6183 3.84448C22.3693 3.82478 22.1193 3.86759 21.891 3.969L17.2245 6.042C17.1292 5.32063 16.7749 4.65849 16.2277 4.17889C15.6805 3.69929 14.9776 3.43491 14.25 3.435H6.408L16.443 17.4825H16.4415ZM1.2705 3.9825C0.877833 4.2597 0.557479 4.62714 0.336387 5.05393C0.115295 5.48071 -6.90215e-05 5.95435 3.09809e-08 6.435V15.435C3.09809e-08 16.2306 0.316071 16.9937 0.87868 17.5563C1.44129 18.1189 2.20435 18.435 3 18.435H11.592L1.2705 3.984V3.9825ZM15.8895 21.87L0.8895 0.87L2.1105 0L17.1105 21L15.8895 21.87Z" fill="#EEEEEF"/>
      </svg>`
      myVideoStream.getVideoTracks()[0].enabled = false
    }
  })

  // Leaves call and remove video.
  endCall.addEventListener('click', (e) => {
    // myVideoStream.remove()
    // peerConnection.disconnect()
    // window.location.href = '/'

    console.log('C')
    console.log(endCall)
  })

  // Open popup of invitation code.
  inviteUser.addEventListener('click', (e) => {
    const invitePopUp = document.querySelector('.invitePopUp')
    const invitationID = document.querySelector('#invitationID')
    inviteUser.classList.toggle('activeMenuItem')
    invitePopUp.classList.toggle('activePopup')
    invitationID.value = roomID
  })

  // Toggles the chat, make it open and close by adding a active class.
  openChat.addEventListener('click', (e) => {
    const chat = document.querySelector('.chatGrid')
    openChat.classList.toggle('activeMenuItem')
    chat.classList.toggle('active')
    videoGridContainer.classList.toggle('active')
  })

  // When pressing 'Copy invitation ID', the code will automatically pasted on the clipboard
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

// If there are two messages in a row from the same user, this code
// will remove the name and time from the previous message.
function checkLastMessage(chatList) {
  const chatArr = chatList.childNodes
  let lastElem = chatArr[chatArr.length - 1]
  let secLastElem = chatArr[chatArr.length - 2]

  if (chatArr.length >= 3) {
    const lastMsg = lastElem.childNodes[1].innerText
    const msgBefore = secLastElem.childNodes[1].innerText
    console.log(lastMsg === msgBefore)
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
function createChatElement(message) {
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
