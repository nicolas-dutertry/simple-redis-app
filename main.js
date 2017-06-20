const http = require('http');
const Redis = require('ioredis');

const sentinelHost = process.env.SENTINEL_HOST || 'redis-sentinel';
const sentinelPort = parseInt(process.env.SENTINEL_PORT || '26379');
const redisMasterName = process.env.REDIS_MASTER_NAME || 'mymaster';

console.log("Starting Simple Redis App");
console.log("Redis Sentinel host: " + sentinelHost);
console.log("Redis Sentinel port: " + sentinelPort);
console.log("Redis Master name: " + redisMasterName);

const redisClient = new Redis({
    sentinels: [{ host: sentinelHost, port: sentinelPort }],
    name: redisMasterName
});

redisClient.on("error", function(err) {
    console.log("Redis error " + err);
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
  console.log(`Simple Redis App running on port ${port}`);
});