let countdown

// declare the HTML variables so that they can be used below
const timerDisplay = document.querySelector('.time-left')
const endTime = document.querySelector('.end-time')

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown)

  // get start time and future time (in microseconds)
  const start = Date.now()
  const future = start + seconds * 1000

  // display time
  displayTimeLeft(seconds)
  displayEndTime(future)

  // countdown seconds
  countdown = setInterval(() => {
    let secondsLeft = Math.round((future - Date.now())/1000)

    // check to see if we need to stop (at rounded 0 seconds)
    if(secondsLeft <= -1) {
      clearInterval(countdown)
      return
    }

    // display time left in minutes and seconds
    displayTimeLeft(secondsLeft)
  }, 1000)
}

// converts seconds into minutes and seconds
function displayTimeLeft(seconds) {

  // math.floor makes sure minutes change before 30 seconds are left
  const minutes = Math.floor(seconds / 60)
  const remainderSeconds = seconds % 60

  // changing to 2 digit seconds if less than 10 seconds
  const display = `${minutes}:${remainderSeconds < 10 ? '0': ''}${remainderSeconds}`

  // show contents to browser with timerDisplay
  timerDisplay.textContent = display

}

// show Ending time using browser with endTime
function displayEndTime(timestamp) {
  const end = new Date(timestamp)
  const hour = end.getHours()
  const minutes = end.getMinutes()

  // sets time in 12 hour time
  const adjHour = hour > 12 ? hour - 12 : hour

  // sets minutes with padded zero if less than 10
  const adjMins = minutes < 10 ? '0' : ''

  // show contents to browser with endTime
  endTime.textContent = `Be Back At ${adjHour}:${adjMins}${minutes}`
}

// Enter Input from HTML form
document.input.addEventListener('submit', function(e) {

  // stop reloading page (because otherwise it will read before done)
  e.preventDefault()

  // get the form input using the name "minutes"
  const mins= this.minutes.value
  timer(mins * 60)
  this.reset()
})
