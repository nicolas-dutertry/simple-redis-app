# simple-redis-app

A simple node app for testing Redis high availability with [Redis Sentinel](https://redis.io/topics/sentinel).

Each time a request is received, a counter is incremented in Redis and the counter's value is returned.

## Environment variables

* SENTINEL_HOST: Redis Sentinel IP address
* SENTINEL_PORT: Redis Sentinel port (default to 26379)
* REDIS_MASTER_NAME: Master name (defaut to mymaster)
