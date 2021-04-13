const socket = io('/')
const path = window.location.pathname
const roomID = path.replace('/rooms/', '')
const videoGridContainer = document.querySelector('.videoGrid')
const userVideo = document.createElement('video')
userVideo.muted = true
let myVideoStream

let browserUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia
let peerConnection = new Peer(undefined, {
  path: '/peerjs',
  host: '/',
  port: '3131',
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
  socket.emit('join-room', roomID, id)
})

console.log(socket)

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
