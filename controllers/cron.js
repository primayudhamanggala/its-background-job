var CronJob = require('cron').CronJob;

let test = new CronJob('* * * * * *', function(){
  console.log('test');
}, null, true, 'Asia/Jakarta')

// test.start()
