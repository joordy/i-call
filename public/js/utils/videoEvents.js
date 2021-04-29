// All event listeners of the 5 options in the video-screen
export function videoEvents(myVideoStream, videoGridContainer) {
  const muteMyself = document.querySelector('#muteMyself')
  const stopVideo = document.querySelector('#stopVideo')
  const endCall = document.querySelector('#endCall')
  const inviteUser = document.querySelector('#inviteUser')
  const openChat = document.querySelector('#openChat')
  const copyBtn = document.querySelector('#copyRoomID')

  // Mute microphone of yourself, replacing SVG's when muted and unmuted.
  muteMyself.addEventListener('click', (e) => {
    let childs = muteMyself.childNodes
    let userAudioEnabled = myVideoStream.getAudioTracks()[0].enabled
    muteMyself.classList.toggle('activeMenuItem')

    if (!userAudioEnabled) {
      childs[1].src = './assets/icons/mic.png'
      myVideoStream.getAudioTracks()[0].enabled = true
    } else {
      childs[1].src = './assets/icons/micMute.png'
      myVideoStream.getAudioTracks()[0].enabled = false
    }
  })

  // Stops video of yourself, replacing SVG's when paused and started.
  stopVideo.addEventListener('click', (e) => {
    let childs = stopVideo.childNodes
    let userVidEnabled = myVideoStream.getVideoTracks()[0].enabled
    stopVideo.classList.toggle('activeMenuItem')

    if (!userVidEnabled) {
      childs[1].src = './assets/icons/cam.png'
      myVideoStream.getVideoTracks()[0].enabled = true
    } else {
      childs[1].src = './assets/icons/camOff.png'
      myVideoStream.getVideoTracks()[0].enabled = false
    }
  })

  // Open popup of invitation code.
  inviteUser.addEventListener('click', (e) => {
    const invitePopUp = document.querySelector('.invitePopUp')
    const invitationID = document.querySelector('#invitationID')
    inviteUser.classList.toggle('activeMenuItem')
    invitePopUp.classList.toggle('activePopup')
    invitationID.value = roomID.innerHTML
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

  // Toggles the chat, make it open and close by adding a active class.
  openChat.addEventListener('click', (e) => {
    const chat = document.querySelector('.chatGrid')
    const header = document.querySelector('.roomHeader')
    openChat.classList.toggle('activeMenuItem')
    chat.classList.toggle('active')
    header.classList.toggle('active')
    videoGridContainer.classList.toggle('active')
  })
}
