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
const endCall = document.getElementById('endCall')
userVideo.muted = true
let myVideoStream

let myPeerConn = new Peer(undefined, {
  path: '/peerjs',
  host: '/',
  // port: '3232', // Development Port
  port: '443', // Heroku Port
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

    // Prevends form submission
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault()
      if (chatMsg.value != '') {    // Checks if form isn't empty
        socket.emit('message', {    // Create message object and send to server
          message: chatMsg.value,
          user: myUserName,
          room_ID: roomID,
        })
        chatMsg.value = ''          // Clear message field.
      }
    })

    // Send message to specific room, received from the server
    socket.on('createMessage', (message) => {
      // Create chat element function
      const chatElem = createChatElement(message)
  
      // Select chat message container and append element
      const chatList = document.querySelector('.chatMessages')
      chatList.appendChild(chatElem)

      // Automatic scroll to bottom
      chatList.scrollTop = chatList.scrollHeight

      // When user sended it by themself, add class of Own Message
      if (message.text.user === myUserName) {
        chatElem.setAttribute('class', 'ownMessage')
      }

      // Check last message, to remove duplicate name and times
      checkLastMessage(chatList)
    })

    // Fires all the Event Listeners of the video-call options
    videoEvents(myVideoStream, videoGridContainer)
  })

myPeerConn.on('call', async (answerCall) => {
  const video = document.createElement('video')
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  })

  // Answers incoming call
  answerCall.answer(stream)

  // Add videostream to the call
  answerCall.on('stream', (newUserStream) => {
    addNewUserVideoStream(video, newUserStream, answerCall.peer)
  })

  // When user is leaving the socket connection, by disconnecting, the user's video will be removed.
  socket.on('userDisconnecting', (elem) => {
    removeVideo(answerCall, elem)
  })
  
  // When user end's connection, send to dashboard page
  endCall.addEventListener('click', (e) => {
    console.log('stop bellen')
    window.location.href = '/call_ended'
  })

})

// Opens connection of PeerJS, and sends roomID, peerID and userName to server.
myPeerConn.on('open', (id) => {
  // console.log('roomID', roomID)
  socket.emit('join-room', {
    room_ID: roomID,
    peer_ID: id,
    userName: myUserName,
  })
})

// Function which adds the video connection using 'call' from PeerJS, adds video of new user to the app.
function newUserConnected(userID, streams) {
  const video = document.createElement('video')

  // Call other users
  const callUser = myPeerConn.call(userID, streams)

  // Add videostream to the call
  callUser.on('stream', (newUserStream) => {
    addNewUserVideoStream(video, newUserStream, callUser.peer)
  })

  // When user is leaving the socket connection, by disconnecting, the user's video will be removed.
  socket.on('userDisconnecting', (elem) => {
    removeVideo(callUser, elem)
  })

  // When user end's connection, send to dashboard page
  endCall.addEventListener('click', (e) => {
    console.log('Dit is een beindig bel knop')
    window.location.href = '/call_ended'
  })
}

// Add stream to video source
function addNewUserVideoStream(videoElement, stream, className) {
  videoElement.srcObject = stream
  videoElement.setAttribute('class', className)
  videoElement.addEventListener('loadedmetadata', () => {
    videoElement.play()
  })
  videoGridContainer.append(videoElement)
}

function removeVideo(callConnection, elem) {
    console.log('This lad leaved:', elem)

    // Checks if provider connections are existing
    if (callConnection.provider._connections) {
      let allUserConnections = []
      
      // Push all object values in userArr
      for (let item of callConnection.provider._connections) {
        allUserConnections.push(item[0])
      }
      
      // Filter leaved user ID with the connection ID's
      const leavedUsers = allUserConnections.filter(id => id === elem)

      // If leavedUsers exists, find HTML element of leaved user and remove it from HTML
      if (leavedUsers) {
        let leavedUserVid = document.getElementsByClassName(`${leavedUsers[0]}`)
        for (let item of leavedUserVid) {
          console.log(item);
          item.remove()
        }
      }
    }
}