const xhr = require('xhr')
const Webrtc2images = require('webrtc2images')

const rtc = new Webrtc2images({
	width: 200,
	height: 200,
	frames: 10,
	type: "image/jpeg",
	quality: 0.4,
	interval: 200
})

rtc.startVideo(function (err){
	if(err) return logError(err)
})

const record = document.querySelector('#record')

record.addEventListener('click', function (e) {
  e.preventDefault()

  rtc.recordVideo(function (err, frames){
  	if(err) return logError(err)

  	xhr({
  		url: '/process',
  		method: 'post',
  		headers: { 'Content-type': 'application/json' },
  		body: JSON.stringify({ images:frames }),
  	}, function (err, res, body){
  		if(err) return logError(err)

  		console.log(JSON.parse(body))
  	})
  })

}, false)

function logError (err) {
  console.error(err)
}