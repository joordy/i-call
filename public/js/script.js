function getLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude)
    })
  } else {
    alert('Geolocation is not supported by this browser.')
  }
}

getLocation()
