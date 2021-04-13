const socket = io(window.location.origin)
const myPeerConnection = new Peer(undefined, {
  path: '/peerjs',
  host: '/',
  port: '3030',
})
const path = window.location.pathname
const roomID = path.replace('/rooms/', '')
const userVideo = document.createElement('video')
const videoContainer = document.querySelector('.videoGrid')
const allPeers = {}
let myVideoStream
userVideo.muted = true

console.log(roomID)

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
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
  const copyBtn = document.querySelector('#copyRoomID')

  muteMyself.addEventListener('click', (e) => {
    let userAudioEnabled = myVideoStream.getAudioTracks()[0].enabled
    muteMyself.classList.toggle('activeMenuItem')
    if (!userAudioEnabled) {
      myVideoStream.getAudioTracks()[0].enabled = true
      muteMyself.textContent = 'Mute'
    } else {
      myVideoStream.getAudioTracks()[0].enabled = false
      muteMyself.textContent = 'Unmute'
    }
  })

  stopVideo.addEventListener('click', (e) => {
    let userVidEnabled = myVideoStream.getVideoTracks()[0].enabled
    console.log('Hey jou heb ik nodig', myVideoStream.getVideoTracks()[0])
    stopVideo.classList.toggle('activeMenuItem')

    if (!userVidEnabled) {
      myVideoStream.getVideoTracks()[0].enabled = true
      stopVideo.textContent = 'Stop Video'
    } else {
      myVideoStream.getVideoTracks()[0].enabled = false
      stopVideo.textContent = 'Play Video'
    }
  })

  endCall.addEventListener('click', (e) => {
    console.log('C')
    console.log(endCall)
  })

  inviteUser.addEventListener('click', (e) => {
    const invitePopUp = document.querySelector('.invitePopUp')
    const roomID = document.querySelector('#roomID')
    inviteUser.classList.toggle('activeMenuItem')
    invitePopUp.classList.toggle('activePopup')
    roomID.value = window.location.href
  })

  openChat.addEventListener('click', (e) => {
    const chat = document.querySelector('.chatGrid')
    openChat.classList.toggle('activeMenuItem')
    chat.classList.toggle('active')
    videoContainer.classList.toggle('active')
  })

  copyBtn.addEventListener('click', (e) => {
    const invitePopUp = document.querySelector('.invitePopUp')
    const roomID = document.querySelector('#roomID')
    const inputEl = document.createElement('input')
    document.body.appendChild(inputEl)
    inputEl.value = roomID.value
    inputEl.select()
    document.execCommand('copy', false)
    inputEl.remove()
    setTimeout(() => {
      invitePopUp.classList.remove('activePopup')
      inviteUser.classList.remove('activeMenuItem')
    }, 500)
  })
}
