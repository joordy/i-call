const room_ID = document.querySelector('#roomID').innerText
// console.log(room_ID)

if (window.location.pathname === `/rooms/${room_ID}`) {
  // const socket = io(`/rooms/${room_ID}`)
  const socket = io()
  console.log(socket)
  socket.emit('join-room', room_ID, 10)
}
