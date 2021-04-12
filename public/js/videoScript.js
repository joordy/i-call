const socket = io('/')
const myPeerConnection = new Peer(undefined, {
  path: '/peerjs',
  host: '/',
  port: '3030',
})
const path = window.location.pathname
const roomID = path.replace('/rooms/', '')
const userVideo = document.createElement('video')
const videoContainer = document.querySelector('.videoGrid')
// const muteMyself = document.querySelector('#muteMyself')
// const stopVideo = document.querySelector('#stopVideo')
// const endCall = document.querySelector('#endCall')
// const inviteUser = document.querySelector('#inviteUser')
// const openChat = document.querySelector('#openChat')

console.log(muteMyself, stopVideo, endCall, inviteUser, openChat)

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
    videoEvents()
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

function videoEvents() {
  const muteMyself = document.querySelector('#muteMyself')
  const stopVideo = document.querySelector('#stopVideo')
  const endCall = document.querySelector('#endCall')
  const inviteUser = document.querySelector('#inviteUser')
  const openChat = document.querySelector('#openChat')

  muteMyself.addEventListener('click', (e) => {
    console.log('A')
    console.log(muteMyself)
  })
  stopVideo.addEventListener('click', (e) => {
    console.log('B')
    console.log(stopVideo)
  })
  endCall.addEventListener('click', (e) => {
    console.log('C')
    console.log(endCall)
  })
  inviteUser.addEventListener('click', (e) => {
    console.log('D')
    console.log(inviteUser)
  })
  openChat.addEventListener('click', (e) => {
    const chat = document.querySelector('.chatGrid')
    openChat.classList.toggle('activeMenuItem')
    chat.classList.toggle('active')
    videoContainer.classList.toggle('active')
    // chat.width = '30%'
    console.log('E')
    console.log(openChat)
  })
}

// muteMyself.addEventListener('click', (e) => {
//   console.log('A')
//   console.log(muteMyself)
// })

// stopVideo.addEventListener('click', (e) => {
//   console.log('B')
//   console.log(stopVideo)
// })

// endCall.addEventListener('click', (e) => {
//   console.log('C')
//   console.log(endCall)
// })

// inviteUser.addEventListener('click', (e) => {
//   console.log('D')
//   console.log(inviteUser)
// })

// openChat.addEventListener('click', (e) => {
//   console.log('E')
//   console.log(openChat)
// })
