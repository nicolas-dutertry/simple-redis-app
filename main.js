const http = require('http');
const Redis = require('ioredis');
const redisClient = new Redis({
    sentinels: [{ host: 'sentinel', port: 26379 }],
    name: 'mymaster'
});

redisClient.on("error", function(err) {
    console.log("Error " + err);
});

redisClient.on("connect", function() {
    console.log("Connected to Redis");
});

const port = 3000;

const server = http.createServer(function(req, res) {
  redisClient.incr('reqcount');  
  redisClient.get('reqcount', (err, value) => {
      if(err) {
          console.log("Error " + err);
          res.statusCode = 500;
          res.end();
      } else {          
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Request count: ' + value);
      }
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});