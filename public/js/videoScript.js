const socket = io('/')
const myPeerConnection = new Peer(undefined, {
  path: '/peerjs',
  host: '/',
  port: '3030',
})
const path = window.location.pathname
const roomID = path.replace('/rooms/', '')
const videoContainer = document.querySelector('.videoGrid')
const userVideo = document.createElement('video')
const allPeers = {}
userVideo.muted = true

console.log(roomID)

console.log('navigator', navigator)
console.log('navigator.mediaDevices', navigator.mediaDevices)
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    let myVideoStream
    myVideoStream = stream
    addVideoToPage(userVideo, stream)

    myPeerConnection.on('call', (callUser) => {
      const video = document.createElement('video')
      callUser.answer(stream)
      callUser.on('stream', (userVideoStream) => {
        addVideoToPage(video, userVideoStream)
      })
    })

    socket.on('user-connected', (userId) => {
      connectWithNewUser(userId, stream)
    })
  })

// Socket scripts

console.log(socket)

myPeerConnection.on('open', (id) => {
  console.log(id)
  socket.emit('join-room', roomID, id)
})

function connectWithNewUser(userId, stream) {
  const callUser = myPeerConnection.call(userId, stream)
  const video = document.createElement('video')
  callUser.on('stream', (userVideoStream) => {
    addVideoToPage(video, userVideoStream)
  })
}

function addVideoToPage(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoContainer.append(video)
}
