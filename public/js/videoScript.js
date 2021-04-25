// Importing Event Listeners
import { videoEvents } from './utils/videoEvents.js'
import { checkLastMessage, createChatElement } from './utils/chats.js'

// Global variables
const socket = io('/')
const roomID = document.querySelector('#roomID').textContent
const videoGridContainer = document.querySelector('.videoGrid')
const userVideo = document.createElement('video')
const chatForm = document.querySelector('#form')
const chatMsg = document.querySelector('#chatMsg')
const chatMessages = document.querySelector('#chatMessages')
const myUserName = document.querySelector('#userName').innerHTML
const peers = {}
userVideo.muted = true

let myVideoStream
// let browserUserMedia =
//   navigator.getUserMedia ||
//   navigator.webkitGetUserMedia ||
//   navigator.mozGetUserMedia

let myPeerConn = new Peer(undefined, {
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
    addNewUserVideoStream(userVideo, stream, myPeerConn._id)

    // When new user will connect, it fires the NewUserConnected function on line 124
    socket.on('user-connected', (userID) => {
      console.log('User is connected', userID)
      newUserConnected(userID, stream)
    })

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
      console.log(message)

      const chatElem = createChatElement(message)
      const chatList = document.querySelector('.chatMessages')
      chatList.appendChild(chatElem)
      chatList.scrollTop = chatList.scrollHeight

      if (message.text.user === myUserName) {
        chatElem.setAttribute('class', 'ownMessage')
      }
      checkLastMessage(chatList)
    })

    // socket.on('userDisconnecting', (elem) => {
    //   console.log(elem)
    //   console.log('doei, inside')
    //   userDisconnected(elem)
    // })

    const myPeerID = myPeerConn._id

    // Fires all the Event Listeners
    videoEvents(myVideoStream, videoGridContainer)
  })

myPeerConn.on('call', async (answerCall) => {
  // navigator.mediaDevices
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  })
  console.log('incoming call')
  const video = document.createElement('video')
  answerCall.answer(stream)

  answerCall.on('stream', (newUserStream) => {
    addNewUserVideoStream(video, newUserStream, myPeerConn._id)
  })

  answerCall.on('close', () => {
    console.log('hey hij is gestopt (called)')
    video.srcObject = null
  })

  const endCall = document.getElementById('endCall')

  endCall.addEventListener('click', (e) => {
    console.log(answerCall)
    answerCall.close()
    video.srcObject = null
    window.location.href = '/dashboard'
  })

  console.log('socket:', socket)
  socket.on('userDisconnecting', (elem) => {
    console.log('host left')
    console.log(elem)
    console.log('doei, inside')
    userDisconnected(elem)
    const vid = document.getElementById(elem)
    console.log(vid)
    vid.parentNode.removeChild(vid);
  })
})

// Opens connection of PeerJS, and sends roomID, peerID and userName to server.
myPeerConn.on('open', (id) => {
  console.log('roomID', roomID)
  socket.emit('join-room', {
    room_ID: roomID,
    peer_ID: id,
    userName: myUserName,
  })
})

socket.on('user-disconnect', (id) => {
  console.log('test outside')
  userDisconnected(id)
  console.log(id)
})

// Function which adds the video connection using 'call' from PeerJS, adds video of new user to the app.
function newUserConnected(userID, streams) {
  console.log('new user connected')
  const callUser = myPeerConn.call(userID, streams)
  const video = document.createElement('video')

  callUser.on('stream', (newUserStream) => {
    console.log('new user stream', newUserStream)
    addNewUserVideoStream(video, newUserStream, userID)
  })

  callUser.on('close', () => {
    console.log('hey hij is gestopt')
    video.srcObject = null
    video.remove()
  })

  const endCall = document.getElementById('endCall')

  endCall.addEventListener('click', (e) => {
    console.log(callUser)
    callUser.close()
    video.srcObject = null
    window.location.href = '/dashboard'

  })

  socket.on('userDisconnecting', (elem) => {
    console.log('new user left')
    console.log(elem)
    console.log('doei, inside')
    userDisconnected(elem)
  })
}

function userDisconnected(userID) {
  const vidElem = document.querySelector(`#${userID}`)
  console.log(userID, vidElem)

}

// Add stream to video source
function addNewUserVideoStream(videoElement, stream, className) {
  console.log('nieuw stream', stream)
  console.log('nieuw videoElement', videoElement)
  videoElement.srcObject = stream
  videoElement.setAttribute('id', className)
  videoElement.addEventListener('loadedmetadata', () => {
    videoElement.play()
  })
  videoGridContainer.append(videoElement)
}