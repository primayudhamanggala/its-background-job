// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')
var CronJob = require('cron').CronJob;
var kue     = require('kue'),
queue   = kue.createQueue()
require('dotenv').config()

// app.use(bodyParser.urlencoded({extended: false}))

// const index = require('./routes/index')

// app.use('/', index)



let job = new CronJob('* * * * * *', function(){
  var task = queue.create('email', {
    title: 'Mail from me',
    to: 'primayudha.manggala@gmail.com',
    template: 'test-mail'
  }).save(function(err){
    if(!err) console.log(task.id);
  })
}, null, true, 'Asia/Jakarta')

queue.process('email', function(job, done){
  sendingMail(job.data, done)
})

job.start()

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'primayudha.manggala@gmail.com',
    pass: process.env.PASS_MAIL
  }
})

let mailOptions = {
  from: '"Primayudha" <primayudha.manggala@gmail.com>',
  to: 'primayudha.manggala@gmail.com',
  subject: 'Cron Job Mail',
  text: 'Hello'
}
function sendingMail(data, done) {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error.message);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  })
  done()
}


// app.listen(process.env.PORT || 3000)
