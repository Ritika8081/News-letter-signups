//jshint esversion:6
const express = require('express')
const bodyParser = require('body-parser')
// const request = require('request')
const https = require('https')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/signups.html')
})
app.post('/', function (req, res) {
  const firstName = req.body.fName
  const lastName = req.body.lName
  const Email = req.body.Email

  var data = {
    members: [
      {
        Email: Email,
        status: 'subscribed',
        merge_field: {
          fName: firstName,
          lName: lastName,
        },
      },
    ],
  }
  var jsonData = JSON.stringify(data)
  const url = 'https://us21.api.mailchip.com/3.0/lists/dfe2e43a9b.'

  const options = {
    method: 'POST',
    auth: 'ritika8081:9bd42747dcb2ecb9dc700099aa6c6403-us21',
  }

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + '/success.html')
    } else {
      res.sendFile(__dirname + '/failure.html')
    }

    response.on('data', function (data) {
      console.log(JSON.parse(data))
    })
  })
  request.write(jsonData)
  request.end()
})
app.post('/failure', function (req, res) {
  res.redirect('/')
})

app.listen(process.env.PORT || 3000, function () {
  console.log('server is running on port 3000')
})

//9bd42747dcb2ecb9dc700099aa6c6403-us21
