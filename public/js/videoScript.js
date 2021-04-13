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
  // port: '3131',
  port: '443',
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
