const init = () => {
  if (window.location.pathname === '/') {
    console.log('home page')
  } else if (window.location.pathname === '/dashboard') {
    const accInfo = document.querySelector('.accInfo')
    const profilePopup = document.querySelector('.profilePopup')
    
    accInfo.addEventListener('click', (e) => {
      profilePopup.classList.toggle('active')
    })

    console.log('dashboard page')
  } else {
    console.log('other page')
  }
}

init()